const { EmbedBuilder } = require("discord.js");
const { stripIndent } = require("common-tags");
const mongoose = require("mongoose");
const colors = require("../../utils/colors.json");
const Guild = require("../../schemas/guild");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        let guildProfile = await Guild.findOne({
          guildId: interaction.guild.id,
        });
        if (!guildProfile) {
          guildProfile = await new Guild({
            _id: new mongoose.Types.ObjectId(),
            guildId: interaction.guild.id,
            name: interaction.guild.name,
          });

          await guildProfile.save().catch(console.error);
        }

        await command.execute(interaction, client);
      } catch (error) {
        console.log(error);

        const EmbedError = new EmbedBuilder()
          .setColor(colors.red)
          .setTitle("Something went wrong while executing this command...")
          .setDescription(`Error in Slash Command \`${commandName}\``)
          .addFields({
            name: ":bookmark_tabs: Error Message",
            value: `> ${error.message}`,
          });

        await interaction.reply({
          embeds: [EmbedError],
          ephemeral: true,
        });
      }
    }
  },
};
