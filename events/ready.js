const db = require("nrc.db");

module.exports = {
	name: "ready",
	once: true,
	async execute(client, Discord) {
		console.log(`${client.user.tag}, hazır.`);
		client.user.setPresence({
			activities: [{ name: `Gurlu altyapı botu.`, type: `WATCHING` }],
			status: `dnd`,
		});	
		setInterval(function() {
				client.user.setPresence({
					activities: [{ name: `Gurlu altyapı botu.`, type: `WATCHING` }],
					status: `dnd`,
				});	
		}, 60000);		
	},
};
