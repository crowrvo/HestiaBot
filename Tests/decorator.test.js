require("dotenv").config();
var Reflect = require("reflect-metadata");
var assert = require("assert");
var { Intents } = require("discord.js");

var { HestiaInstance } = require("../build/Core/");
var StartUp = require("../build/Modules/StartUp");
var { bot } = require("../build/Core");

// describe("HestiaBot", function () {
//   let ints = new Intents().add("GUILD_MESSAGES");
//   let bot = new HestiaInstance(ints);
//   it("Se não explodir, funcionou", function () {
//     bot.AddModule(StartUp);
//     assert.ok(true);
//   });
// });
