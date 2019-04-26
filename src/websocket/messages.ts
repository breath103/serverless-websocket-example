/**
 * Server -> Client message
 */
export type ServerMessage = (
  {
    type: "user_connected",
    sessionId: string,
    username: string,
  } | {
    type: "chat_message_created",
    message: string,
    sessionId: string,
  } | {
    type: "stroke_created",
    stroke: {
      x: number, y: number, color: string, size: number,
    }
  }
);

/**
 * Client -> Server Message
 */
export type ClientMessage = (
  {
    type: "create_chat_message",
    message: string,
  }| {
    type: "create_stroke",
    stroke: {
      x: number, y: number, color: string, size: number,
    }
  }
);
