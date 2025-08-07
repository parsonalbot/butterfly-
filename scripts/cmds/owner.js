module.exports = {
  config: {
    name: "owner",
    aliases: ["info"],
    author: "𝗠𝗢𝗗𝗜𝗙𝗔𝗬 𝗬𝗘𝗔𝗦𝗜𝗡",
    role: 0,
    shortDescription: "Displays admin info",
    longDescription: "Shows info about the bot owner/admin",
    category: "𝗔𝗗𝗠𝗜𝗡 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const message = `
➪▭▭▭▭▭▭▭▭▭▭▭▭▭✰
         👑  𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢  👑
➪▭▭▭▭▭▭▭▭▭▭▭▭▭✰
➪▭▭▭▭▭▭▭▭▭▭▭▭▭✰
🧑‍💼 𝗡𝗔𝗠𝗘         : 𝗬𝗘𝗔𝗦𝗜𝗡   
➪▭▭▭▭▭▭▭▭▭▭▭▭▭✰
🚹 𝗚𝗘𝗡𝗗𝗘𝗥       : 𝗠𝗔𝗟𝗘  
➪▭▭▭▭▭▭▭▭▭▭▭▭▭✰
💘 𝗥𝗘𝗟𝗔𝗧𝗜𝗢𝗡𝗦𝗛𝗜𝗣 : 𝗦𝗜𝗡𝗚𝗟𝗘 😞 
➪▭▭▭▭▭▭▭▭▭▭▭▭▭✰ 
🎂 𝗔𝗚𝗘          : 𝟭𝟵
➪▭▭▭▭▭▭▭▭▭▭▭▭▭✰
🕌 𝗥𝗘𝗟𝗜𝗚𝗜𝗢𝗡     : 𝗜𝗦𝗟𝗔𝗠  
➪▭▭▭▭▭▭▭▭▭▭▭▭▭✰
🏡 𝗔𝗗𝗗𝗥𝗘𝗦𝗦      : 𝗕𝗔𝗡𝗚𝗟𝗔𝗗𝗘𝗦𝗛
           𝗖𝗢𝗠𝗜𝗟𝗟𝗔 - 𝗗𝗛𝗔𝗞𝗔
➪▭▭▭▭▭▭▭▭▭▭▭▭▭✰
📱 𝗧𝗜𝗞𝗧𝗢𝗞       : 𝗜𝘁𝘀_𝗺𝗲_𝘁𝘂𝗳𝗮𝗻01  
➪▭▭▭▭▭▭▭▭▭▭▭▭▭✰
📵 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣     : 𝗗𝗜𝗠𝗨 𝗡𝗔
➪▭▭▭▭▭▭▭▭▭▭▭▭▭✰
🌐 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞     : facebook.com/profile.php?id=100055496720330
➪▭▭▭▭▭▭▭▭▭▭▭▭▭✰`;

      await api.sendMessage({
        body: message
      }, event.threadID, event.messageID);

      if (event.body.toLowerCase().includes('ownerinfo')) {
        api.setMessageReaction('🖤', event.messageID, (err) => {}, true);
      }

    } catch (error) {
      console.error('Error in ownerinfo command:', error);
      return api.sendMessage('Something went wrong while processing the command.', event.threadID);
    }
  },
};
