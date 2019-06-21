/***| variables |***/
const database = require('./src/database.js');
const discord = require('discord.js');
const client = new discord.Client();

/***| create role & parse commands |***/
client.on('guildCreate', (guild) => guild.createRole({ name: 'nodkp', color: 'GREY' }));
client.on('message', (message) => {
	if (message.author.bot || message.channel.type != 'text' || !message.content.startsWith('$')) return;
	let option = message.content.split(' ');

	database.createUser(message);

	switch (option[0]) {
		case '$nodkp':
			if (message.author.id != message.guild.ownerID) break;
			database.createChannel(message);
			break;
		case '$alias':
			if (message.author.id != message.guild.ownerID) break;
			database.updateAlias(option[1], message);
			break;
		case '$balance':
			database.getBalance(message);
			break;
		case '$update':
			let updateID = option[1].replace('<@', '').replace('>', '');
			database.updateBalance(updateID, option[2], message);
			break;
		case '$deduct':
			let deductID = option[1].replace('<@', '').replace('>', '');
			database.deductBalance(deductID, option[2], message)
			break;
		default:
			break;
	};

	message.delete();
});

/***| handle errors |***/
client.on('error', console.error);

/***| start bot |***/
client.login(process.env.DISCORD_TOKEN);