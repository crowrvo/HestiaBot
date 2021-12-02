import { Notifiable } from "../../../Shared/Notifications";
import IDiscordService from "../Services/IDiscordService";

export default class CreateTicketCommand extends Notifiable {
  private _UserId: string;
  public get GetUserId(): string {
    return this._UserId;
  }

  constructor(UserId: string) {
    super();
    this._UserId = UserId;
  }

  public Validate(DiscordService: IDiscordService) {
    // O Usuário DEVE existir, logo o Retorno deve ser TRUE
    // Caso FALSO, add notificação
    if (!DiscordService.UserExists(this._UserId))
      this.AddNotification(
        "Commands.CreateTicket",
        "O id do usuário não é valido"
      );
    // O Canal NÃO PODE existir, logo o Retorno deve ser FALSE
    // Caso TRUE, add notificação
    if(DiscordService.ChannelExists(this._UserId))
      this.AddNotification(
        "Commands.CreateTicket",
        "Esse usuário já possuí um TICKET em aberto!"
      )
  }
}
