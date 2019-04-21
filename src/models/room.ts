import { Decorator, Query, Table } from "dynamo-types";

@Decorator.Table({ name: `room_prod_sessions` })
export class Room extends Table {
  @Decorator.HashPrimaryKey("i")
  public static readonly primaryKey: Query.HashPrimaryKey<Room, string>;

  @Decorator.Attribute({ name: "i" })
  public roomId: string;
}
