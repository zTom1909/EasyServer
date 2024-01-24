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
    .addSubcommand((cmd) =>
      cmd
        .setName("logs")
        .setDescription("Setup the logs for this server")
        .addStringOption((type) =>
          type
            .setName("type")
            .setDescription("Set the type of event to log")
            .addChoices(
              { name: "Message Create", value: "messageCreate" },
              { name: "Message Update", value: "messageUpdate" },
              { name: "Message Delete", value: "messageDelete" },
              { name: "Bulk Message Delete", value: "messageDeleteBulk" },
              { name: "Interaction Create", value: "interactionCreate" },
              { name: "Member Join", value: "memberAdd" },
              { name: "Member Update", value: "memberUpdate" },
              { name: "Member Leave", value: "memberRemove" },
              { name: "Role Create", value: "roleCreate" },
              { name: "Role Update", value: "roleUpdate" },
              { name: "Role Delete", value: "roleDelete" },
              { name: "Channel Create", value: "channelCreate" },
              { name: "Channel Update", value: "channelUpdate" },
              { name: "Channel Delete", value: "channelDelete" },
              { name: "Invite Create", value: "inviteCreate" },
              { name: "Invite Delete", value: "inviteDelete" },
              { name: "Guild Update", value: "guildUpdate" },
              { name: "Ban Add", value: "banAdd" },
              { name: "Ban Remove", value: "banRemove" },
              { name: "Member Timeout", value: "memberTimeout" },
            )
            .setRequired(true)
        )
        .addChannelOption((channel) =>
          channel
            .setName("channel")
            .setDescription("Channel where the logs will display")
            .setRequired(true)
        )
        .addStringOption((channels) =>
          channels
            .setName("onlychannels")
            .setDescription(
              "Only log events from these channels (Tag the channels or use their IDs)"
            )
        )
        .addStringOption((channels) =>
          channels
            .setName("ignorechannels")
            .setDescription(
              "Ignore this channels when logging (Tag the channels or use their IDs)"
            )
        )
        .addBooleanOption((isRemove) =>
          isRemove
            .setName("remove")
            .setDescription(
              "Remove onlychannels or ignorechannels instead of adding them to the list"
            )
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    // Language
    const lang = interaction.options.getString("language");
    // Logs
    const type = interaction.options.getString("type");
    const channel = interaction.options.getChannel("channel");
    const onlychannels = interaction.options.getString("onlychannels");
    const ignorechannels = interaction.options.getString("ignorechannels");
    const isRemove = interaction.options.getBoolean("isRemove");

    const { data, success } = await configHandler(
      subcommand,
      { lang, type, channel, onlychannels, ignorechannels, isRemove },
      interaction
    );

    const EmbedConfig = new EmbedBuilder()
      .setColor(success ? colors.green : colors.red)
      .setDescription(data.message);

    return interaction.reply({ embeds: [EmbedConfig] });
  },
};
