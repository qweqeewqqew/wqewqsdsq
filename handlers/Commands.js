const { readdirSync } = require("fs");
const Table = require("ascii-table");
const commands = [];

module.exports = async (client) => {
	const slashCommandFiles = readdirSync("commands").filter(
		(file) => file.endsWith(".js")
	);
	const SlashTable = new Table(`Slash Commands (${slashCommandFiles.length})`);	

	SlashTable.setHeading("Komut Adı", "Durum");
	for (const commandFile of slashCommandFiles) {
		const command = require(`../commands/${commandFile}`);

		if (
			command.data &&
			command.data.name &&
			typeof command.execute == "function"
		) {
			try {
				command.data = command.data.toJSON();
				commands.push(command.data);

				SlashTable.addRow(command.data.name, "Hazır");

				client.slashCommands.set(command.data.name, command);
			} catch (error) {
				SlashTable.addRow(commandFile.slice(0, commandFile.length - 3), "Hata");
			}
		} else {
			SlashTable.addRow(commandFile.slice(0, commandFile.length - 3), "Hata");
		}
	}
	console.log(SlashTable.render());
	
};
