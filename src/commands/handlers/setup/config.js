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
  }
};
