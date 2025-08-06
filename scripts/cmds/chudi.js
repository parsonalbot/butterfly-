let isWarOn = true;

module.exports = {
  config: {
    name: "chudi",
    aliases: ["chud"],
    version: "1.3",
    author: "nexo_here + fixed by Yeasin",
    role: 2,
    category: "admin",
    guide: {
      en: "chud @mention to attack, chud off to stop"
    }
  },

  onStart: async function ({ api, event, args }) {
    const content = args.join(" ").toLowerCase();
    const mention = Object.keys(event.mentions)[0];

    // Turn off war mode
    if (content === "off") {
      isWarOn = false;
      return api.sendMessage("❌ | War mode turned OFF.", event.threadID);
    }

    // Auto turn on if mention present and war currently off
    if (mention && !isWarOn) {
      isWarOn = true;
    }

    // If war mode off, do nothing
    if (!isWarOn) return;

    // Require mention to start war messages
    if (!mention) return api.sendMessage("⚠️ | Tag someone to start war.", event.threadID);

    const name = event.mentions[mention];
    const arraytag = [{ id: mention, tag: name }];
    const send = msg => api.sendMessage({ body: msg, mentions: arraytag }, event.threadID);

    const messages = [
      `কিরে মাদারচোত নেওয়াজ এর চুদন খাওয়ায় জন্য রেডি তো? লে চুদা খা মাঙ্গের বেটা 😂😂 ${name}`,
      `মাঘি চুদা শরের বাচ্চা কার লগে পঙ্গা নিতে আসছিস 🤬🤬🤬 ${name}`,
      `চুদে গুহা ফাঁক করে দিব খানকীর পোলা 🤤 ${name}`,
      `মাদারচোত বোকাচোদা খানকীর পোলা ${name}`,
      `বেসসা মাঘী চোদা কুত্তা চোদা ${name}`,
      `ছাগল চুদা গরু চুদা মাঙ্গের বেটা লোকজন দেখে লাগতে আসিস কুত্তার বাচ্চা 🤬 ${name}`,
      `তোর আব্বুকে ভুলে গেলি মাদারচোত 😂 ${name}`,
      `তোকে কনডম ছাড়া চুদী মঙ্গের বেটা 🖕🏿 ${name}`,
      `আমার ধন চুষ তাইলে থামবো 😂 ${name}`,
      `তোকে কুত্তা দিয়ে চোদাই 😍 ${name}`,
      `মাঘীর মাং চাটিস বোকাচোদার বাচ্চা তোকে কন্ডম ছাড়া উল্টা করে চুদি 🤬 ${name}`,
      `এখনো সময় আছে মাফ চা 🤣🤣 ${name}`,
      `তোর নানি কেমন আছে 😍?? ${name}`,
      `তোকে চুদী 🥰 ${name}`,
      `মাদারচোত 🥰 ${name}`,
      `আব্বা কে ভুলিস না 🤬 ${name}`,
      `আজকের চুদন আজীবন মনে রাখিস বোকাচোদা 🤣🤣🤣 ${name}`,
      `মাঘা 🥰 ${name}`,
      `আয় আমার হোল টা চুষে দে 🥵🥵 ${name}`,
      `বাপ কে ভুলিস না বোকাচোদার বাচ্চা 🤬🤬🤬🤬🤬 ${name}`,
      `হোল কাটে নিবো 🤬🤬🤬🤬🤬🤬 ${name}`,
      `তোমার গুষ্টি চুদী ব্রো 😞🖕🏿 ${name}`,
      `🖕🏿🖕🏿🖕🏿🖕🏿🖕🏿🖕🏿🖕🏿🖕🏿🖕🏿 ${name}`,
      `মাঘীর ছেলে তোর মাকে চুদী 🖕🏽🖕🏽🖕🏽 ${name}`,
      `আজকে তোকে প্যান্ট না খুলেই চুদবো 🤬 তোর মাকে একটু আগেই চুঁদে আসলাম 😂 ${name}`,
      `বোকাচোদার বাচ্চা 😂 ${name}`,
      `মাদারচোত বোকাচোদা খানকীর ছেলে 🤬 ${name}`,
      `প্যান্ট ভিজে নাই 🤣🤣🤣🤣🤣🤣🤣??? ${name}`,
      `আরো চুদন খাইতে চাচ্ছিস ???? ${name}`,
      `আয় মাদারচোত আমার ধণ টা চুষে যা 🤬 ${name}`,
      `তোকে ডগি স্টাইল e চুদী 😋😋 ${name}`,
      `তোর আব্বাকে ভুললে আরেকবার এমন চুদন চুদবো মোর যাবি মঙ্গের বেটা 😂😂😂 ${name}`,
      `আজকের চুদন আজীবন মনে রাখবি 🤣🤣🤣 ${name}`,
      `আয় আমার ধোন টা চুষে যা মঙ্গের পুত 🤬🤬🤬🤬 ${name}`,
      `তোরে মুততে মুততে চুদী 🤣🤣 ${name}`,
      `চুঁদে পাউরুটি বানায় তোর হোগায় ভরে দিব মাঙ্গের বেতা চিনিস আমারে??? ${name}`,
      `খানকীর পোলা তোর বাপকে ভুলে গেলি?? জন্ম দেওয়া ভুল হইলো 🤬🤬🤬 ${name}`,
      `বোকাচোদার বাচ্চা 😍 ${name}`,
      `তোকে চুদী 😍😍😍 ${name}`,
      `হোল কাটে নিবো মঙ্গের বেটা কার লগে লাগতে আসছিস 🤬 ${name}`,
      `নেওয়াজ এর চুদন কেমন লাগলো বাচ্চা 🤣🤣🤣🤣?? ${name}`
    ];

    messages.forEach((msg, i) => {
      setTimeout(() => send(msg), 3000 * i);
    });
  }
};
