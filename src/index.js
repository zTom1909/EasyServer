require("dotenv").config();
require("./functions/utils/logError")();
const fs = require("fs");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { connect } = require("mongoose");

const { token, databaseToken } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token);
(async () => await connect(databaseToken).catch(console.error))();
