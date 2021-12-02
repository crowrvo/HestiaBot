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
import { EInstanceStatus } from "../../../Shared/Enums";

describe("StartUp", function () {
  let ints = new Intents().add("GUILD_MESSAGES");
  let bot = new HestiaInstance(ints);

  it("Deve retornar 0 / Running após o login do bot e 1 / Stopped antes", function () {
    //retorna stopped antes do login
    assert.equal(bot.GetInstanceStatus, EInstanceStatus.Stopped);

    bot.Start(process.env.BOT_TOKEN);
    //Retornar Running após o login
    assert.equal(bot.GetInstanceStatus, EInstanceStatus.Running);
  });
});
