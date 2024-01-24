const { ActivityType } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const crashPath = path.resolve("./crash.log");

    const crashExists = () => {
      fs.access(crashPath, fs.constants.F_OK, (err) => {
        if (!err) console.log("There has been a crash!");
      });
    };

    client.user.setPresence({
      activities: [
        {
          name: "Helping with community creations",
          type: ActivityType.Listening,
        },
      ],
      status: "online",
    });

    const Guilds = client.guilds.cache.map((guild) => guild.id);
    console.log(`> The bot is in ${Guilds.length} servers!`);
    console.log("EasyServer successfully started!");
    crashExists();
  },
};
