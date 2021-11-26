require("dotenv").config();
var assert = require("assert");
var { Intents } = require("discord.js");
var { HestiaInstance } = require("../build/Core/");
var { EInstanceStatus } = require("../build/Shared/Enums");

const ints = new Intents().add("GUILD_MESSAGES");
const bot = new HestiaInstance(ints);

describe("HestiaBot", function () {
  bot.addEvent("ready", (e) => console.log("Evento de inicio 1"));
  bot.addEvent("ready", (e) => console.log("Evento de inicio 2"));
  bot.addEvent("ready", (e) => console.log("Evento de inicio 3"));

  it("Deve retornar 0 / Running após o login do bot e 1 / Stopped antes", function () {
    //retorna stopped antes do login
    assert.equal(bot.GetInstanceStatus, EInstanceStatus.Stopped);

    bot.start(process.env.BOT_TOKEN);
    //Retornar Running após o login
    assert.equal(bot.GetInstanceStatus, EInstanceStatus.Running);
  });
});
