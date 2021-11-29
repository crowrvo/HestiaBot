import { ClientEvents, Message, MessageEvent } from "discord.js";
import { Event } from "../../Shared/Decorators/DEvents";

export default class StartUp {
  @Event("ready")
  start(...[e]: ClientEvents["ready"]) {
    console.log("Iniciado");
  }

  @Event("messageCreate")
  message(...[message]: ClientEvents["messageCreate"]) {
    console.log(message.cleanContent, message.content); //testa agr, tava com a tipagem errada
  }
}

// AddEvent<Event extends key
//   event: Event,
//   callback: (...args: ClientEvents[Event]) => void
// ) {
//   // !this._EventsList.hasOwnProperty(event) | old, mais lento
//   if (!this._EventsList[event]) this._EventsList[event] = [];
//   this._EventsList[event].push(callback);
// }

