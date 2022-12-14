const {
	SlashCommandBuilder,
	Client,
	ChatInputCommandInteraction,
	EmbedBuilder,
} = require("discord.js");
const { colour } = require("../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with API & WS ping."),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		//Requiring all properties
		let days = Math.floor(client.uptime / 86400000) % 30;
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;
		let webLatency = new Date() - interaction.createdAt;
		let apiLatency = client.ws.ping;
		let emLatency = {
			Green: "🟢",
			Yellow: "🟡",
			Red: "🔴",
		};

		//Building an Embed to send
		let latancy = new EmbedBuilder()
			.setColor(colour.main)
			.setTitle(`Latency And API Ping`)
			.addFields(
				{
					name: "📡 Websocket Latency",
					value: `\`${
						webLatency <= 200
							? emLatency.Green
							: webLatency <= 400
							? emLatency.Yellow
							: emLatency.Red
					}\` \`${webLatency}\`ms`,
				},
				{
					name: "🛰 API Latency",
					value: `\`${
						apiLatency <= 200
							? emLatency.Green
							: apiLatency <= 400
							? emLatency.Yellow
							: emLatency.Red
					}\` \`${apiLatency}\`ms`,
				}
			);

		//Sending the ping Embed
		interaction.reply({
			embeds: [latancy],
		});
	},
};
