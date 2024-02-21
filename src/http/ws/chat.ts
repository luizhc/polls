import { FastifyInstance } from "fastify";
import z from "zod";
import { chating } from "../../utils/chating-pub-sub";

const chatParams = z.object({ chatId: z.string() });

export async function chat(app: FastifyInstance) {
  app.get("/chat/:chatId", { websocket: true }, (connection, request) => {
    const { chatId } = chatParams.parse(request.params);

    chating.connect(chatId, connection);

    connection.socket.on("message", (message: any) =>
      chating.stream(chatId, connection, message)
    );

    connection.socket.on("close", () => chating.disconnect(chatId, connection));
  });
}
