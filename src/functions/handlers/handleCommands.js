require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

const { token, clientid } = process.env;

module.exports = (client) => {
  client.handleCommands = async () => {
    const { commands, commandArray } = client;
    const commandFolder = fs.readdirSync("./src/commands/controllers");

    for (const folder of commandFolder) {
      const commandFiles = fs
        .readdirSync(`./src/commands/controllers/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../../commands/controllers/${folder}/${file}`);
        commands.set(command?.data?.name, command);
        commandArray.push(command?.data?.toJSON());
      }
    }

    const rest = new REST({ version: "9" }).setToken(token);
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands(clientid), {
        body: client.commandArray,
      });

      console.log("Succesfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
