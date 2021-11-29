import { ClientEvents } from "discord.js";

export const Event = (event: keyof ClientEvents): MethodDecorator => {
  return (target, propertyKey: string): void => {
    //? Caso a array de eventos ainda não exista, Cria ela.
    if (!Reflect.hasMetadata("events", target.constructor)) {
      Reflect.defineMetadata("events", [], target.constructor);
    }

    //? Recupera todos methods cadastrados anteriormente.
    const events = Reflect.getMetadata("events", target.constructor);

    //? Adiciona o novo method.
    events.push({
      Name: event,
      Method: propertyKey,
    });

    //? Atualiza nossa lista de eventos.
    Reflect.defineMetadata("events", events, target.constructor);
  };
};
