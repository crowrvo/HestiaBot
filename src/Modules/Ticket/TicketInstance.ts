import { Embed } from "@discordjs/builders"
import { CategoryChannel, GuildMember, User } from "discord.js"
import HestiaBot from "../../Core"
import { EGuilds } from "../../Shared/Enums"

import { 
  CategoryIdException, 
  ChannelNameException, 
} from "./TicketExceptions"

function TicketHelpEmbed(Member: GuildMember) {

  return new Embed()
  .setTitle(`Hey ${Member.displayName} !`)
  .setDescription(
    "Em alguns instantes, a nossa STAFF irá te responder, só aguarde um momento, ok ? :grin:"
  )
  .addFields(
    {
    name: "Quer encerrar o TICKET ?",
    value: "Digite /ticket encerrar ou chame o bot ! Ex: @hestia encerrar"
  },
  {
    name: "Qual é a dúvida ou problema que você está tendo ?",
    value: "Deixe logo abaixo relatando o que está havendo."
  })

}

export default class TicketInstance {

  private _MemberId: string
  private _ChannelId: string
  private _CategoryId: string

  private _OpenedTickets: [{
    UserId: string, 
  }] = [{UserId: ""}]

  public get GetTickets() {
    return this._OpenedTickets
  }

  /**
   * @param ChannelName Nome do canal
   * @param CategoryId ID da categoria
   */
  constructor(_MemberId: string, CategoryId: string) {
    this._MemberId = _MemberId
    this._CategoryId = CategoryId
  }
  /**
   * @param options Opções sobre a pesquisa
   * @param options >SearchFor procurar pelo valor
   * @param options >FindAndDelete Achar e apagar ?
   * @returns TicketInstance
   */
  async SearchTicket(options: { FindAndDelete?: boolean, SearchFor?: string }): Promise<TicketInstance | boolean> {
    
    const MangaGuild = await HestiaBot.GetClient.guilds.cache.get(EGuilds.Mangas)
    
    const ChannelsInCategory = await MangaGuild.channels.cache.filter(channel => channel.parentId == "896634359497519156")

    if(ChannelsInCategory.size == 0) {
      console.log("Não à nenhum ticket criado !");
      return this
    }

    if(!options) {
      ChannelsInCategory.forEach(channel => {
        console.log(`${channel.name} encontrado !`);
      })
      return this
    }

    if(options.SearchFor) {
      
      let ChannelExist = ChannelsInCategory.filter(channel => 
        channel.name.toLocaleLowerCase() == options.SearchFor.toLocaleLowerCase()
      )

      if(ChannelExist.size == 0) {
        console.log(`Não achei o ticket ${options.SearchFor}`);
        return false
      }

      if(ChannelExist.size > 0 && !options.FindAndDelete) {
        console.log(`achei o ticket ${options.SearchFor} !`);
        return true
      }

      if(ChannelExist.size > 0 && options.FindAndDelete) {
        console.log(`${options.SearchFor} encontrado, preparando deletar ...` );
        ChannelExist.forEach(async channel => await channel.delete("Deletado por uma requisição."))
        console.log(`${options.SearchFor} foi deletado !`);
        return this
      }
    }
    
    if(!options.SearchFor && options.FindAndDelete) {
      ChannelsInCategory.forEach(async channel => {
        await channel.delete("Deletado por uma requisição")
        console.log(`${channel.name} foi encontrado e apagado !`);
      })
      return this
    }
  }

  /**
   * @param toMemberId Usuário que será atendido
   * @returns TicketInstance
   */
  async CreateTicketChannel(): Promise<TicketInstance> {

    if(this._MemberId.length == 0) 
      throw ChannelNameException("Nome do canal não pode ser Nulo.")
    if(this._CategoryId.length == 0) 
      throw CategoryIdException("ID do CategoryChannel não pode ser Nulo.")

    const MangaGuild = await HestiaBot.GetClient.guilds.cache.get(EGuilds.Mangas)

    // @ts-ignore
    const Category: CategoryChannel = await MangaGuild.channels.cache.get(this._CategoryId)

    let Member

    await (await MangaGuild.members.fetch({ limit: 1000 }))
      .forEach(member => {
        if(member.id == this._MemberId) return Member = member
      })


    const IDs = {
      UMember: Member,
      RAjudante: "895070016943325244",
      REveryone: MangaGuild.roles.everyone.id
    }

    try {

      // Criando o canal com as permissões acima
      const result = await Category.createChannel(this._MemberId, {
        reason: `Ticket aberto por ${Member.displayName}`,
        permissionOverwrites: [
          {
            id: IDs.UMember,
            allow: [
              "VIEW_CHANNEL",
              "MANAGE_MESSAGES",
              "READ_MESSAGE_HISTORY",
            ]
          },
          {
            id: IDs.REveryone,
            deny: [
              "VIEW_CHANNEL"
            ]
          },
          {
            id: IDs.RAjudante,
            allow: [
              "VIEW_CHANNEL",
              "MANAGE_MESSAGES",
              "READ_MESSAGE_HISTORY",
            ]
          }

        ]
      })

      // Enviando a mensagem de help para o usuário, e notificando-o
      await result.send({
        embeds: [ TicketHelpEmbed(Member) ], content: `<@${Member.id}>`
      })

      // Fazendo o PUT dos recursos
      this._ChannelId = result.id
      this._OpenedTickets.push({UserId: Member.id})

      const time = 10 // segundos

      // Caso nenhuma mensagem dentro de time segundos seja enviada, ele apagará o canal
      result.awaitMessages({ idle: time * 1000 })
        .then((e) => {
          if(e.size == 0){
            result.delete(`Ticket ${result.name} foi deletado por ausência.`)
            console.log(`${result.name} foi deletado por ausência`);
          }
        })


      return this
      
    } catch (error) {
      console.error(error);
    }
  }

  async DeleteTicketChannel() {

    if(this._ChannelId.length == 0) 
      throw ChannelNameException("Crie o canal antes que ele seja apagado.")

    const MangaGuild = await HestiaBot.GetClient.guilds.cache.get(EGuilds.Mangas)

    const result = await (await MangaGuild.channels.fetch(this._ChannelId))
      .delete("Foi solicitado que o canal fosse apagado.")

    if(result)
      return console.log(`Ticket ${result.name} foi deletado !`);
    
    return console.log(`Não foi possível apagar o ticket ${result.name}`);
    
  }

}