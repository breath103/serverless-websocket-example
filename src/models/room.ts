import { Decorator, Query, Table } from "dynamo-types";

/**
 * Generel Meta data of Community.
 */
@Decorator.Table({ name: `chat_prod_room` })
export class Room extends Table {
  @Decorator.HashPrimaryKey("i")
  public static readonly primaryKey: Query.HashPrimaryKey<Room, string>;

  @Decorator.Attribute({ name: "i" })
  public id: string;

  @Decorator.Attribute({ name: "session_ids" })
  public sessionIds: string[] = [];

  @Decorator.Attribute({ name: "strokes" })
  public strokes: Array<{
    x: number, y: number, color: string, size: number
  }> = [];
}
