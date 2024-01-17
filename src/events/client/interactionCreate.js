const { InteractionType, EmbedBuilder } = require("discord.js");
const { stripIndent } = require("common-tags");
const colors = require("../../utils/colors.json");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: stripIndent`
                ### Something went wrong while executing this command...
                > Error: ${error.message}
                `,
          ephemeral: true,
        });
      }
    }
  },
};
