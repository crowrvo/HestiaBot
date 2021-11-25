import { Client } from "discord.js";
import type { BaseClient, Intents } from "discord.js";
import type { EInstanceStatus } from "../Shared/Enums/";
import { Notifiable } from "../Shared/Notifications";

export default class HestiaInstance {
  private readonly _Client: BaseClient;
  private readonly _InstanceStatus: EInstanceStatus;
  public get GetInstanceStatus(): EInstanceStatus {
    return this._InstanceStatus;
  }
  /**
   * @param intents - Pontos de acesso
   */
  constructor(intents: Intents) {
    this._Client = new Client({ intents });
  }

  login(token: string): void {}
}

