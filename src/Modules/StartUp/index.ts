import { ClientEvents, Message, MessageEvent } from "discord.js";
import { Event } from "../../Shared/Decorators/DEvents";

export default class StartUp {
  @Event("ready")
  start(...[e]: ClientEvents["ready"]) {
    console.log("Iniciado");
  }

  @Event("messageCreate")
  message(...[message]: ClientEvents["messageCreate"]) {
    console.log(message.cleanContent, message.content);
  }

}