const mongoose = require("mongoose");
const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/nazrul4x/Noobs/main/Apis.json`);
  return base.data.api;
};

module.exports = {
  config: {
    name: "quiz",
    aliases: ["qz", "quizzes"],
    version: "1.6.9",
    author: "Nazrul",
    description: "Play common knowledge Quizzes Games",
    countDown: 5,
    role: 0,
    category: "game",
    guide: "{p}quiz [bn/en]\n{p}qz list - Show all user quiz details\n{p}qz top - Show top 10 players",
  },

  onStart: async function ({ api, event, usersData, args }) {
    const input = args.join("").toLowerCase() || "bn";

    if (input === "list") {
      return this.showQuizList({ api, event });
    }

    if (input === "top" || input === "leaderboard") {
      return this.leaderboard({ api, event });
    }

    let timeout = 130;
    let category = input === "en" || input === "english" ? "english" : "bangla";

    const { canPlay, remaining, resetIn } = await trackDailyLimit(event.senderID);
    if (!canPlay) {
      return api.sendMessage(
        `❌ You have reached your daily limit of 20 quizzes.\n⏳ Time until reset: ${resetIn}\nCome back later to play more!`,
        event.threadID,
        event.messageID
      );
    }

    try {
      const response = await axios.get(
        `${await baseApiUrl()}/nazrul/Quiz?category=${category}&type=random`
      );
      const quizData = response.data;
      const { question, answer, options } = quizData;
      const { A, B, C, D } = options;
      const playerName = ((await usersData.get(event.senderID)).name)

      const quizMsg = {
        body: `${playerName}, let's play quiz!\n\n📜 ${question}\n\n(A) ${A}\n(B) ${B}\n(C) ${C}\n(D) ${D}\n\n🕒 You have 2 minutes to answer.\n🛠 Remaining quizzes today: ${remaining}`,
      };

      api.sendMessage(
        quizMsg,
        event.threadID,
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            type: "reply",
            commandName: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            dataGame: quizData,
            answer,
            nameUser: playerName,
            attempts: 10,
            completed: false,
          });

          setTimeout(() => {
            api.unsendMessage(info.messageID).catch(console.error);
          }, timeout * 1200);
        },
        event.messageID
      );
    } catch (error) {
      console.error("❌ | Error occurred:", error);
      api.sendMessage(
        "⚠ Failed to fetch the quiz. Please try again later.",
        event.threadID,
        event.messageID
      );
    }
  },

  onReply: async function ({ event, api, Reply, usersData?}) {
    const { answer, nameUser, author } = Reply;

    if (event.senderID !== author) {
      return api.sendmessage("⚠ This is not your quiz question.", event.threadID, event.messageID);
    }

    if (Reply.completed) {
      return api.sendMessage(
        `${nameUser}, this quiz has already been completed. You cannot reply to it anymore.`,
        event.threadID,
        event.messageID
      );
    }

    const maxAttempts = 4;

    if (Reply.attempts >= maxAttempts) {
      Reply.completed = true
      await api.unsendMessage(Reply.messageID).catch(console.error);
      global.GoatBot.onReply.delete(Reply.messageID);
      return api.sendMessage(
        `🦆💨 ${nameUser}, you’ve used your attempts.\n✅ Correct Answer: ${answer}.`,
        event.threadID,
        event.messageID
      );
    }

    if (event.body.toLowerCase() === answer.toLowerCase()) {
      Reply.completed = true;
      global.GoatBot.onReply.delete(Reply.messageID);
      api.unsendMessage(Reply.messageID).catch(console.error);

      const rewardCoins = 1000;
      const rewardExp = 111;
      const userData = await usersData.get(author);

      const totalMoney = await updateTotalMoney(author, rewardCoins);
      await usersData.set(author, {
        money: totalMoney,
        exp: userData.exp  rewardExp,
      });

      await trackUserStats(author, nameUser, rewardCoins);

      return api.sendMessage(
        `👑 ${nameUser}, Correct Answer! 🎀\n\n💰 You earned ${rewardCoins} Coins.\n🛠 You gained ${rewardExp} EXP.\n`,
        event.threadID,
        event.messageID
      );
    } else {
      Reply.attempts += 1;
      global.GoatBot.onReply.set(Reply.messageID, Reply);

      return api.sendMessage(
        `🦆💨 Wrong Answer.\n🔖 You have ${maxAttempts - Reply.attempts} attempts left.`,
        event.threadID,
        event.messageID
      );
    }
  },

  showQuizList: async function ({ api, event }) {
    const Globals = mongoose.model("globals");
    const stats = await Globals.findOne({ key: "quizStats" });

    if (!stats || !stats.data || !stats.data.players.length) {
      return api.sendMessage("No qz data available.", event.threadID, event.messageID);
    }

    const leaderboard = stats.
