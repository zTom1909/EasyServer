const Guild = require("../../../schemas/guild");

module.exports = async (subcommand, options, interaction) => {
  let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
  
  switch (subcommand) {
    case "language":
      const { lang } = options;

      guildProfile.language = lang;
      await guildProfile.save().catch((error) => {
        console.error(error);
        return { data: { message: error.message }, success: false };
      });

      const formatLang = {
        en: "English",
        es: "Español",
      };

      return {
        data: {
          message: `Your language has been changed to \`${formatLang[lang]}\``,
        },
        success: true,
      };
    case "logs":
      const { type, channel, onlychannels, ignorechannels, isRemove } = options;
      guildProfile.logs = guildProfile.logs || {};
      guildProfile.logs[type] = channel;

      const extractChannelIds = (channels) => {
        const channelRegex = /<#(\d+)>|\b(\d+)\b/g;
        const channelIds = [];
        let match;

        while ((match = channelRegex.exec(channels)) !== null) {
          const channelId = match[1] || match[2];
          channelIds.push(channelId);
        }
        return channelIds;
      };

      const updateChannelList = (profile, channels, isRemove) => {
        if (channels) {
          if (isRemove)
            profile = profile.filter((channel) => !channels.includes(channel));
          else profile = extractChannelIds(channels);
        }
        return profile;
      };

      if (!isRemove) {
        guildProfile.logs.onlyChannels = updateChannelList(
          guildProfile.logs.onlyChannels,
          onlychannels,
          false
        );
        guildProfile.logs.ignoreChannels = updateChannelList(
          guildProfile.logs.ignoreChannels,
          ignorechannels,
          false
        );
      } else {
        guildProfile.logs.onlyChannels = updateChannelList(
          guildProfile.logs.onlyChannels,
          onlychannels,
          true
        );
        guildProfile.logs.ignoreChannels = updateChannelList(
          guildProfile.logs.ignoreChannels,
          ignorechannels,
          true
        );
      }
      
      guildProfile.markModified("logs")
      await guildProfile.save().catch((error) => {
        console.error(error);
        return { data: { message: error.message }, success: false };
      });

      return {
        data: {
          message: `Your logs have been added to ${channel}`,
        },
        success: true,
      };
  }
};
