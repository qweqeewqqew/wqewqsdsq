const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, token } = require("../config.json");
const { readdirSync } = require("fs");

const rest = new REST({ version: "9" }).setToken(token);
const commands = [];

const slashCommandFiles = readdirSync("commands").filter((file) =>
	file.endsWith(".js")
);

for (const commandFile of slashCommandFiles) {
	const command = require(`../commands/${commandFile}`);

	if (
		command.data &&
		command.data.name &&
		typeof command.execute == "function"
	) {
		command.data = command.data.toJSON();
		commands.push(command.data);
	}
}

rest
	.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => {
		console.log("Etkileşim komutları kuruldu!");
		process.exit(0);
	})
	.catch(console.error);
