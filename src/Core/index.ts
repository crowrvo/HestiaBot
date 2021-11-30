import { Intents } from "discord.js";
import HestiaInstance from "./HestiaInstance";

const Ints = new Intents()
  .add("GUILD_MESSAGES")
  .add("GUILDS")
  .add("GUILD_MEMBERS")
  .add("GUILD_INTEGRATIONS")

let HestiaBot = new HestiaInstance(Ints);

HestiaBot.Start(process.env.BOT_TOKEN)

export default HestiaBot;
