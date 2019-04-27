import { Decorator, Query, Table } from "dynamo-types";

@Decorator.Table({ name: `chat_prod_sessions` })
export class Session extends Table {
  @Decorator.HashPrimaryKey("i")
  public static readonly primaryKey: Query.HashPrimaryKey<Session, string>;

  @Decorator.Attribute({ name: "i" })
  public sessionId: string;

  @Decorator.Attribute({ name: "u" })
  public userId: string;

  @Decorator.Attribute({ name: "r" })
  public roomId: string;
}

// tslint:disable-next-line:max-classes-per-file
@Decorator.Table({ name: `chat_stroke` })
export class Stroke extends Table {
  @Decorator.HashPrimaryKey("createdAt")
  public static readonly primaryKey: Query.HashPrimaryKey<Stroke, string>;

  @Decorator.Attribute({ name: "createdAt" })
  public createdAt: number;

  @Decorator.Attribute({ name: "data" })
  public data: {
    x: number,
    y: number,
    size: number,
    color: string,
  };
}
