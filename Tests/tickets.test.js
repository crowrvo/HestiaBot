require("dotenv").config();
var Reflect = require("reflect-metadata");
var assert = require("assert");
var { Intents } = require("discord.js");
var { EGuilds } = require("../build/Shared/Enums");
var { HestiaInstance } = require("../build/Core/");
var StartUp = require("../build/Modules/StartUp").default;
var HestiaBot = require("../build/Core").default
const { env } = require("process");
var { TicketInstance } = require("../build/Modules/Ticket");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Tickets", function () {
  // let ints = new Intents().add("GUILD_MESSAGES").add("GUILDS");
  // let bot = new HestiaInstance(ints);
  // bot.Start(env.BOT_TOKEN);

  it("Batatinha !", function () {
    sleep(2000).then(() => {

      const MangaGuild = HestiaBot.GetClient.guilds.cache.get(EGuilds.Mangas);

      const Category =
        MangaGuild
          .channels.cache.find(
            (channel) =>
              channel.type == "GUILD_CATEGORY" &&
              channel.name.toLowerCase() == "tickets scan"
          );

      const TicketTest = new TicketInstance("489138381910179851", Category.id)

      TicketTest.SearchTicket({ SearchFor: "489138381910179851" })
        .then(value => {

          if (value == TicketTest || value == false)
            return value.CreateTicketChannel()

          if (value == true)
            return console.log("Você não pode criar um ticket, já existe um !");

        })

      // .then(a => {
      //   a.CreateTicketChannel()
      //     .then(b =>
      //       console.log(b.GetTickets)
      //     )

      // })
    })

  });
});

