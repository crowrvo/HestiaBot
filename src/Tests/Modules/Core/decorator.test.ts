//#region OBRIGATÓRIOS
// Apenas em caso de login no bot
import * as dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
// Apenas em caso de login no bot
import "mocha";
import * as assert from "assert";
//#endregion

import { Intents } from "discord.js";
import HestiaInstance from "../../../Core/HestiaInstance";
import StartUp from "../../../Modules/StartUp";

describe("HestiaBot", function () {
  let ints = new Intents().add("GUILD_MESSAGES");
  let bot = new HestiaInstance(ints);
  it("Se não explodir, funcionou", function () {
    bot.AddModule(StartUp);
    assert.ok(true);
  });
});
