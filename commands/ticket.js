const { SlashCommandBuilder } = require("@discordjs/builders");
const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ticket")
		.setDescription("Sunucunuz için ticket mesajı oluşturursunuz."),
	async execute({interaction, client}) {
		if(interaction.member.permissions.has("ADMINISTRATOR")) {			
			const ticketEmbed = new MessageEmbed()
			.setColor("GREEN")
			.setTitle("Ticket Oluştur")
			.setDescription(`**Destek Talebi Oluşturmak İçin Aşağıdaki Butona Basınız.** \n:warning: Lütfen Gereksiz Yere Destek Talebi Oluşturmayınız.`)
			.setFooter({text: `${interaction.guild.name} Ticket Sistemi`, iconURL: interaction.guild.iconURL({dynamic: true})})
			const row = new MessageActionRow()
			.addComponents(
			new MessageButton()
			.setCustomId('GurluTicket')
			.setLabel('Destek')
			.setEmoji('📩')
			.setStyle('SECONDARY'),		
			);			
			interaction.reply({content: "Ticket sistemi başarılı şekilde aktif edildi.", ephemeral: true})
			interaction.channel.send({embeds: [ticketEmbed], components: [row]})
		}else{interaction.reply({content: "Yetersiz yetki.", ephemeral: true})}
	},
};
