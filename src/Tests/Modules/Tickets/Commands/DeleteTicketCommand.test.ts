import * as assert from "assert";
import "mocha";

import FakeDiscordService from "../../../../Mock/Tickets/FakeDiscordService";
import DeleteTicketCommand from "../../../../Modules/Ticket/Commands/DeleteTicketCommand";


describe("DeleteTicketCommand", function() {
  it("Não deve retornar nenhuma notificação", function() {
    const FakeDiscord = new FakeDiscordService()
    const DeleteTicketCmd = new DeleteTicketCommand("false") // False, pois o canal existe

    DeleteTicketCmd.Validate(FakeDiscord)

    const valid = DeleteTicketCmd.isValid()

    console.log(DeleteTicketCmd.GetNotifications);
    
    assert.equal(valid, true)

  }) 

  it("Deve retornar uma notificação que o canal não existe", function() {
    const FakeDiscord = new FakeDiscordService()
    const DeleteTicketCmd = new DeleteTicketCommand("true") // True, pois o canal não existe

    DeleteTicketCmd.Validate(FakeDiscord)

    console.log(DeleteTicketCmd.GetNotifications);

    const valid = DeleteTicketCmd.isValid()

    assert.equal(valid, false)

  }) 

})