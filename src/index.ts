import express from "express";
import { AddressInfo } from "net";
import { musicRouter } from "./controller/routes/musicRouter";
import { userRouter } from "./controller/routes/userRouter";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/music", musicRouter);

const server = app.listen(3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
   } else {
      console.error(`Falha ao rodar o servidor.`);
   }
});  