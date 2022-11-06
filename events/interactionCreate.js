const config = require("../config.json");
const { prefix, owners } = config;

module.exports = {
	name: "interactionCreate",
	async execute(interaction, client, discord) {
		if (interaction.isCommand()) {
			const command = client.slashCommands.get(interaction.commandName);

			if (!command)
				return interaction.reply({
					content:
						"Bu komutu çalıştırırken bir hata oldu! Lütfen daha sonra tekrar deneyiniz.",
					ephemeral: true,
				});

			try {
				command.execute({ interaction, client, discord });
			} catch (error) {
				interaction.reply({
					content:
						"Bu komutu çalıştırırken bir hata oldu! Lütfen daha sonra tekrar deneyiniz.",
					ephemeral: true,
				});
				console.error(error.stack);
			}
		}
	},
};
