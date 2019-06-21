
function alias(message, name) {

	message.channel.send({
		embed: {
			color: 3447003,
			description: `nodkp token name update to **${name}**`,
		}
	});

};

function init(message) {

	message.channel.send({
		embed: {
			color: 3447003,
			description: `nodkp now **available**\nchannel id: *${message.channel.id}*`,
			fields:[
				{
					name:"owner",
					value:" ```\n$alias``` "
				},
				{
					name:"admin",
					value:" ```\n$update\n$deduct``` "
				},
				{
					name:"user",
					value:" ```\n$balance``` "
				}
			]
		}
	});

};

/***| exports |***/
module.exports = {
	alias,
	init
};