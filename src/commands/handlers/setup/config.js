const mongoose = require("mongoose");
const Guild = require("../../../schemas/guild");

module.exports = async (subcommand, options, interaction) => {
  let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
  if (!guildProfile) {
    guildProfile = await new Guild({
      _id: new mongoose.Types.ObjectId(),
      guildId: interaction.guild.id,
      name: interaction.guild.name,
    });

    await guildProfile.save().catch(console.error);
  }

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
