require("dotenv").config();
var Reflect = require("reflect-metadata");
var assert = require("assert");
var { Intents } = require("discord.js");
var { EGuilds } = require("../build/Shared/Enums");
var { HestiaInstance } = require("../build/Core/");
var StartUp = require("../build/Modules/StartUp").default;
var { bot } = require("../build/Core");
const { env } = require("process");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Tickets", async function () {
  let ints = new Intents().add("GUILD_MESSAGES").add("GUILDS");
  let bot = new HestiaInstance(ints);
  await bot.Start(env.BOT_TOKEN);

  it("Batatinha !", async function () {
    await sleep(2000);
    // O bot precisa iniciar, esse evento vai ser adicionado como modulo, então n precisa ter treta, deixa o sleep por hora, q é só teste
    const categoryName = await bot.GetClient.guilds.cache
      .get(EGuilds.Mangas)
      .channels.cache.find(
        (channel) =>
          channel.type == "GUILD_CATEGORY" &&
          channel.name.toLowerCase() == "tickets scan"
      );

    let randomName = (Math.random() + 1).toString(36).substring(7);
    console.log(randomName);

    const MangaGuild = bot.GetClient.guilds.cache.get(EGuilds.Mangas);

    categoryName
      .createChannel(randomName, {
        reason: "teste",
        permissionOverwrites:
        {
          "<@&888121366824513617>": {
            allow: [
              "VIEW_CHANNEL",
              "READ_MESSAGE_HISTORY",
              "MANAGE_CHANNELS",
              "SEND_MESSAGES",
            ],
          },
        },
      })
      .then((e) => {
        // ELE CRIOU O CANAL "ylp79"
        // ss criou, proximo passo
        // permissões do canal
        // Everione = não pode ver, dica, Guild.Roles.Everyone
        // vc mesmo = ve, escreve, etc - Só o id ja basta, tanto pra channel quanto pra role, ou user, só o eveyrone q é diferente
        // te mandei invite dos servers
        // @administradores = ve, escreve, etc
        console.log(e);
      });
    return assert.ok(true);

    // foi
    // ss tlgd, por hora deixa o sleep pra iniciar o bot, isso vai ser adicionado como modulo dps, então n precisamos quebrar a cabeça
    // safe

    // proximo passo, Cria um canal dentro dessa categoria, eu sei fazer, mas to te ensinando como vms testar, pra depois deseolver, eu ja volto
    // console.log(categoryName);
  });
});

// GUILD_CATEGORY
