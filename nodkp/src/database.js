/***| variables |***/
const mongoose = require('mongoose');
const lodash = require('lodash');
const response = require('./response');

/***| database connection |***/
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).catch(err => {
	console.log("{mdb} couldn't connect to database. exiting...");
	process.exit();
});

/***| schemas |***/
const userSchema = new mongoose.Schema({
	userID: { type: String, required: true },
	balance: { type: Number, default: 0 }
});
const channelSchema = new mongoose.Schema({
	channelID: { type: String, required: true, unique: true },
	alias: { type: String, default: 'coin' },
	users: [userSchema]
});

/***| check for nodkp role |***/
var isAdmin = (message) => {
	if (message.member.roles.some(r => ['nodkp'].includes(r.name)) === false) {
		message.author.send("You don't have access to this command.");
		return false;
	};
	return true;
};

/***| create collection for channel |***/
async function createChannel(message) {
	if (!isAdmin(message)) { return };

	let channelModel = await mongoose.model(message.guild.id, channelSchema);
	let channel = await channelModel.findOne({ channelID: message.channel.id });
	if (!channel) {
		new channelModel({ channelID: message.channel.id }).save((err) => {
			if (err) throw err;
			response.init(message)
		});
	};
};

/***| create user in collection |***/
async function createUser(message) {
	let channelModel = await mongoose.model(message.guild.id, channelSchema);
	let channel = await channelModel.findOne({ channelID: message.channel.id });
	if (!channel) return;

	if (!lodash.filter(channel.users, u => u.userID === message.author.id).length) {
		channel.users.push({ userID: message.author.id });
		channel.save();
	};
};

/***| update name for token |***/
async function updateAlias(name, message) {
	if (!isAdmin(message)) { return };

	let channelModel = await mongoose.model(message.guild.id, channelSchema);
	let channel = await channelModel.findOne({ channelID: message.channel.id });
	if (!channel) return;

	channel.alias = name;
	channel.save((err) => {
		if (err) throw err;
		response.alias(message, name);
	});
};

/***| add to user amount of tokens  |***/
async function updateBalance(userID, val, message) {
	if (!isAdmin(message)) { return };

	let channelModel = await mongoose.model(message.guild.id, channelSchema);
	let channel = await channelModel.findOne({ channelID: message.channel.id });
	if (!channel) return;

	let user = lodash.filter(channel.users, u => u.userID === message.author.id);
	if (!user[0]) return;
	user[0].balance += parseInt(val);

	channel.save((err) => {
		if (err) throw err;
		message.channel.send(`<@${user[0].userID}> gained ${val} ${channel.alias}`);
	});
};

/***| deduct from user amount of tokens  |***/
async function deductBalance(userID, val, message) {
	if (!isAdmin(message)) { return };

	let channelModel = await mongoose.model(message.guild.id, channelSchema);
	let channel = await channelModel.findOne({ channelID: message.channel.id });
	if (!channel) return;

	let user = lodash.filter(channel.users, u => u.userID === message.author.id);
	if (!user[0]) return;
	if (user[0].balance < parseInt(val)) { message.author.send('user doesnt have enough funds'); return };
	user[0].balance -= parseInt(val);

	channel.save((err) => {
		if (err) throw err;
		message.channel.send(`<@${user[0].userID}> lost ${val} ${channel.alias}`);
	});
};

/***| get user balance |***/
async function getBalance(message) {
	let channelModel = await mongoose.model(message.guild.id, channelSchema);
	let channel = await channelModel.findOne({ channelID: message.channel.id });
	if (!channel) return;

	let user = lodash.filter(channel.users, u => u.userID === message.author.id);
	if (user[0] === undefined) message.author.send(`0`);
	else message.author.send(user[0].balance);
};

/***| exports |***/
module.exports = {
	updateAlias,
	updateBalance,
	deductBalance,
	createChannel,
	createUser,
	getBalance
};