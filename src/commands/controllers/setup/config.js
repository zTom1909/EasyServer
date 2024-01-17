const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

const colors = require("../../../utils/colors.json");
const configHandler = require("../../handlers/setup/config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Setup your server according to your needs!")
    .addSubcommand((cmd) =>
      cmd
        .setName("language")
        .setDescription("Setup the server language")
        .addStringOption((lang) =>
          lang
            .setName("language")
            .setDescription("The language to setup")
            .addChoices({ name: "English", value: "en" })
            .setRequired(true)
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    const lang = interaction.options.getString("language");
    
    const { data, success } = await configHandler(subcommand, { lang }, interaction);

    const EmbedConfig = new EmbedBuilder()
      .setColor(success ? colors.green : colors.red)
      .setDescription(data.message);

    return interaction.reply({ embeds: [EmbedConfig] });
  },
};
