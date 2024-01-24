const { Schema, model } = require("mongoose");
const guildSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  name: String,
  language: { type: String, required: false },
  logs: {
    type: Schema.Types.Mixed,
    require: false,
  },
});

module.exports = model("Guild", guildSchema, "guilds");
