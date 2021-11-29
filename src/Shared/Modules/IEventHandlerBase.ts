import {ClientEvents} from "discord.js";

export interface IEventHandlerBase {
    Event: keyof ClientEvents;
}