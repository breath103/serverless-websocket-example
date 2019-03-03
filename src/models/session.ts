import { Decorator, Query, Table } from "dynamo-types";

/**
 * Generel Meta data of Community.
 */
@Decorator.Table({ name: `chat_prod_sessions` })
export class Session extends Table {
  @Decorator.HashPrimaryKey("i")
  public static readonly primaryKey: Query.HashPrimaryKey<Session, string>;

  @Decorator.Attribute({ name: "i" })
  public sessionId: string; // Name of interest that this community attached to

  @Decorator.Attribute({ name: "m"})
  public metadata: any;
}
