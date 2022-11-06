const Discord = require("discord.js");
const { Intents, Collection } = Discord;
const client = new Discord.Client({ intents: 32767 });
const db = require("nrc.db");
require("discord-reply");

const { token, owners } = require("./config.json");

client.commands = new Collection();
client.slashCommands = new Collection();

require("./handlers/Commands.js")(client);
require("./handlers/Events.js")(client);

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;
	// Ticket
		if(interaction.customId === "GurluTicket"){
			let destekTalebi = "Yok"
				interaction.guild.channels.cache.forEach(b => {
					if(db.fetch(`gurluTicket_${b.id}`) == interaction.member.id){
						destekTalebi = b
					}
				})
			if(destekTalebi == "Yok"){
			let yetkili = "972546341706268672" //Destek yetkilisinin rol id'si
			const row = new Discord.MessageActionRow()
			.addComponents(
			new Discord.MessageButton()
			.setCustomId('GurluTicketKapat')
			.setLabel('Kapat')
			.setEmoji("❌")
			.setStyle('SECONDARY'),	
			);		
			const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setDescription(`**Yetkili Ekibimiz en kısa sürede sizinle iletişime geçecektir.**\nLütfen sabırla bekleyiniz...`)
			.setFooter({text: `${interaction.guild.name} Ticket Sistemi`, iconURL: interaction.guild.iconURL({dynamic: true})})
			.setTimestamp()
			interaction.guild.channels.create(`destek-${interaction.user.username}`, {
				  type: 'GUILD_TEXT',
				  permissionOverwrites: [{ id: client.user.id, allow: ['VIEW_CHANNEL','MANAGE_CHANNELS','EMBED_LINKS','ATTACH_FILES','ADD_REACTIONS','MENTION_EVERYONE','MANAGE_MESSAGES', 'SEND_MESSAGES']}, {id: interaction.guild.id, deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE']}, { id: interaction.member.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES','EMBED_LINKS','ATTACH_FILES'] }, { id: yetkili, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']}]
			}).then(kanal => {
				kanal.send({content:`${interaction.member},${interaction.guild.roles.cache.get(yetkili)}`,embeds:[embed], components: [row]}) 
				db.set(`gurluTicket_${kanal.id}`, interaction.member.id)
				interaction.reply({content: `Merhaba ${interaction.member}, Destek talebiniz oluşturulmuştur. ${kanal}`, ephemeral: true});
			})
		  }else{interaction.reply({content:`${interaction.member}, Zaten bir destek talebiniz bulunuyor. ${destekTalebi}`, ephemeral: true})}	 	  
		}
		if(interaction.customId === "GurluTicketKapat"){
			interaction.update({components: []})
			interaction.channel.send({content: `${interaction.user} destek talebini sonlandırdı. Kanal 5 saniye sonra silinecek.`})
			setTimeout(async () => {
				if(!interaction.channel) return;
				db.delete(`gurluTicket_${interaction.channel.id}`)
				interaction.channel.delete()
			}, 5000);
		}	
	// Ticket
});


client.login(token).catch((error) =>
	console.error("Lütfen tokeni doğru biçimde girin!\n\n" + error)
);

Promise.prototype.del = (ms) => {
  if (this)
    this.then((m) => {
      if (m.deletable) setTimeout(() => m.delete(), Number(ms));
    });
};

process.on("uncaughtException", (err) => console.error(err.stack));
process.on("unhandledRejection", (err) => console.error(err.stack));
