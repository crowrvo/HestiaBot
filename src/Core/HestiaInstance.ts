import { Client, ClientEvents } from "discord.js";
import { EInstanceStatus } from "../Shared/Enums/";
import type { Intents } from "discord.js";

type EventPair = {
  [key in keyof ClientEvents]: Array<(...args: ClientEvents[key]) => void>;
};

// old method
// [key in keyof ClientEvents]: Array<(...args: ClientEvents[key]) => void>;
export default class HestiaInstance {
  private readonly _Client: Client;
  private _InstanceStatus: EInstanceStatus;
  public get GetInstanceStatus(): EInstanceStatus {
    return this._InstanceStatus;
  }
  private _EventsList: EventPair;

  /**
   * @param intents - Pontos de acesso
   */
  constructor(intents: Intents) {
    this._Client = new Client({ intents });
    this._InstanceStatus = EInstanceStatus.Stopped;
    this._EventsList = {} as EventPair;
    
  }

  /**
   * @param event evento que será lido ao carregada a classe
   * @param callback a função que ele irá exercer
   * @example
   * ```ts
   * BOT.on("ready", e => { bla bla bla })
   * ```
   */
  AddEvent<Event extends keyof ClientEvents>(
    event: Event,
    callback: (...args: ClientEvents[Event]) => void
  ) {
    // !this._EventsList.hasOwnProperty(event) | old, mais lento
    if (!this._EventsList[event]) this._EventsList[event] = [];
    this._EventsList[event].push(callback);
  }

  addCommand() {}

  /**
   * inicializando o BOT
   * @param token DISCORD TOKEN
   */
  Start(token: string): void {
    this._Client.login(token);
    this._InstanceStatus = EInstanceStatus.Running;

    // Lendo eventos
    for (let event in this._EventsList) {
      this._Client.on(event, (...args) => {
        this._EventsList[event].forEach((func) => {
          func(...args);
        });
      });
    }
  }
}
