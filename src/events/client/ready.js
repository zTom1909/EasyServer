const { ActivityType } = require("discord.js");
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log("EasyServer successfully started!");

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
  },
};
