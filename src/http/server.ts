import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import fastify from "fastify";
import { createPoll } from "./routes/create-poll";
import { getPoll, getPolls } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import { chat } from "./ws/chat";
import { pollResults } from "./ws/poll-results";

const app = fastify();

app.register(cookie, {
  secret: "polls-app-nlw",
  hook: "onRequest",
});

app.register(websocket);

app.register(getPolls);
app.register(getPoll);
app.register(createPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.register(chat);

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen({ port }).then(() => {
  console.log(`Server running on port ${port}`);
});
