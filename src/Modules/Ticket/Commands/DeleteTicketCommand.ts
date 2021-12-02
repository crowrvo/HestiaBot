import { Notifiable } from "../../../Shared/Notifications";
import IDiscordService from "../Services/IDiscordService";

export default class DeleteTicketCommand extends Notifiable {

  private _TicketId: string

  public get GetTicketId() {
    return this._TicketId
  }

  constructor(TicketId: string) {
    super()
    this._TicketId = TicketId
  }

  public Validate(DiscordService: IDiscordService) {
    // O Canal DEVE existir, logo o Retorno deve ser TRUE
    // Caso FALSO, add notificação
    if(!DiscordService.ChannelExists(this._TicketId))
      this.AddNotification(
        "Commands.DeleteTicket",
        "O TICKET solicitado não existe"
      )
  }
}