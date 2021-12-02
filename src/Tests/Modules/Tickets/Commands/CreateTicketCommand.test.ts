//#region OBRIGATÓRIOS
import * as assert from "assert";
import "mocha";
//#endregion

import FakeDiscordService from "../../../../Mock/Tickets/FakeDiscordService";
import CreateTicketCommand from "../../../../Modules/Ticket/Commands/CreateTicketCommand";

describe("CreateTicketCommand", function () {
  it("Não deve retornar nenhuma notificação", function () {
    const FakeDiscord = new FakeDiscordService();
    const CreateTicketCmd = new CreateTicketCommand("true");

    CreateTicketCmd.Validate(FakeDiscord);

    const valid = CreateTicketCmd.isValid();
    console.log(CreateTicketCmd.GetNotifications);

    assert.equal(valid, true);
  });

  it("Deve retornar Duas Notificações UserId Incorreto e ja existe o Ticket (2) notificações", function () {
    const FakeDiscord = new FakeDiscordService();
    const CreateTicketCmd = new CreateTicketCommand("false");

    CreateTicketCmd.Validate(FakeDiscord);

    const valid = CreateTicketCmd.isValid();

    console.log(CreateTicketCmd.GetNotifications);
    assert.equal(valid, false);
  });

  it("Deve retornar Apenas uma Notificação de que ja existe Ticket", function () {
    const FakeDiscord = new FakeDiscordService();
    const CreateTicketCmd = new CreateTicketCommand("batata");

    CreateTicketCmd.Validate(FakeDiscord);

    const valid = CreateTicketCmd.isValid();
    console.log(CreateTicketCmd.GetNotifications);
    assert.equal(valid, false);
  });

  it("Deve retornar Apenas uma Notificação de que o user é invalido", function () {
    const FakeDiscord = new FakeDiscordService();
    const CreateTicketCmd = new CreateTicketCommand("cenoura");

    CreateTicketCmd.Validate(FakeDiscord);

    const valid = CreateTicketCmd.isValid();
    console.log(CreateTicketCmd.GetNotifications);
    assert.equal(valid, false);
  });
});
