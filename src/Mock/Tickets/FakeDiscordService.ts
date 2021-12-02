import { TextChannel } from "discord.js";
import IDiscordService from "../../Modules/Ticket/Services/IDiscordService";

export default class FakeDiscordService implements IDiscordService {
  CreateTicketChannel(ChannelId: string): boolean {
    throw new Error("Method not implemented.");
  }
  DeleteTicketChannel(ChannelId: string): boolean {
    throw new Error("Method not implemented.");
  }
  UserExists(UserId: string): boolean {
    if (UserId == "batata") return true;
    if (UserId == "cenoura") return false;
    if (UserId == "false") return false;
    return true;
  }
  ChannelExists(ChannelId: string): boolean {
    if (ChannelId == "batata") return true;
    if (ChannelId == "cenoura") return false;
    if (ChannelId == "false") return true;
    return false;
  }
}
