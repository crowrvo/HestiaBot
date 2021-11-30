import { Client, ClientEvents, HexColorString } from "discord.js";
import { EInstanceStatus, EGuilds } from "../Shared/Enums";
import type { Intents } from "discord.js";

type EventPair = {
  [key in keyof ClientEvents]: Array<(...args: ClientEvents[key]) => void>;
};

// old method
// [key in keyof ClientEvents]: Array<(...args: ClientEvents[key]) => void>;
export default class HestiaInstance {
  private readonly _Client: Client;

  public get GetClient() {
    return this._Client;
  }

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

    //Tickets Scan
  }

  AddModule(module: new () => object): HestiaInstance {
    const instance = new module();
    const Events = Reflect.getMetadata("events", module);
    Events.forEach((Event) => {
      if (!this._EventsList[Event.Name]) this._EventsList[Event.Name] = [];
      this._EventsList[Event.Name].push(instance[Event.Method]);
    });

    return this;
  }

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
