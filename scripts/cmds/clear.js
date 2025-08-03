module.exports = {
  config: {
    name: "clear",
    aliases: ["c"],
    author: "kshitiz",
    version: "2.1",
    cooldowns: 5,
    role: 4,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "unsent all messages sent by bot"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
    const threadID = event.threadID;
    const currentUserID = api.getCurrentUserID();
    let lastMessageID = null;
    let hasMore = true;

    while (hasMore) {
      try {
        const messages = await api.getThreadHistory(threadID, 100, lastMessageID);
        if (!messages.length) break;

        // Filter messages sent by the bot
        const botMessages = messages.filter(msg => msg.senderID === currentUserID);

        if (botMessages.length === 0) {
          // No more bot messages in this batch
          hasMore = false;
          break;
        }

        // Unsend each bot message
        for (const msg of botMessages) {
          try {
            await api.unsendMessage(msg.messageID);
          } catch (error) {
            console.error(`Failed to unsend message ${msg.messageID}: ${error.message}`);
          }
        }

        // Prepare for next batch (fetch older messages)
        lastMessageID = messages[messages.length - 1].messageID;

        // If less than 100 messages fetched, no more messages
        if (messages.length < 100) break;
      } catch (error) {
        console.error("Error fetching message history:", error.message);
        break;
      }
    }
  }
};
