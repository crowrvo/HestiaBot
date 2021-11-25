import { Intents } from "discord.js";
import HestiaInstance from "./App";

const ints = new Intents().add("GUILD_MESSAGES");

const app = new HestiaInstance(ints);

