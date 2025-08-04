module.exports = {
	config: {
		name: "offbot",
		version: "1.0",
		author: "Nirob",
		countDown: 45,
		role: 2,
		shortDescription: "Turn off bot",
		longDescription: "Turn off bot",
		category: "owner",
		guide: "{p}{n}"
	},

	onStart: async function ({ event, api }) {
		api.sendMessage(
			"➪▭▭▭▭▭▭▭▭▭▭▭✰\n\n🔌 𝐎𝐟𝐟 𝐁𝐨𝐭 𝐒𝐲𝐬𝐭𝐞𝐦 𝐈𝐬 𝐍𝐨𝐰 𝐒𝐡𝐮𝐭𝐝𝐨𝐰𝐧 ✅\n\n➪▭▭▭▭▭▭▭▭▭▭▭✰",
			event.threadID,
			() => process.exit(0)
		);
	}
};
