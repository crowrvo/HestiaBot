require("dotenv").config();
var Reflect = require("reflect-metadata");
var assert = require("assert");
var { Intents } = require("discord.js");
var { HestiaInstance } = require("../build/Core");
var { EInstanceStatus } = require("../build/Shared/Enums");
var Reflect = require("reflect-metadata");

// describe("StartUp", function () {
//   let ints = new Intents().add("GUILD_MESSAGES");
//   let bot = new HestiaInstance(ints);

//   it("Deve retornar 0 / Running após o login do bot e 1 / Stopped antes", function () {
//     //retorna stopped antes do login
//     assert.equal(bot.GetInstanceStatus, EInstanceStatus.Stopped);

//     bot.Start(process.env.BOT_TOKEN);
//     //Retornar Running após o login
//     assert.equal(bot.GetInstanceStatus, EInstanceStatus.Running);
//   });
// });
