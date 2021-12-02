import { TextChannel } from "discord.js";

export default interface IDiscordService {
  CreateTicketChannel(UserId: string): boolean;
  DeleteTicketChannel(UserId: string): boolean;
  UserExists(UserId: string): boolean;
  ChannelExists(ChannelId: string): boolean
}
