import express from 'express';
import path from "path";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(express.json()); //IMPORTANTE: .json() é uma função; não esqueça dos devidos parêntesis. :)
app.use(routes);
app.use("/uploads", express.static(path.resolve(__dirname,"..", "uploads"))); //para servir recursos estáticos como imagens
app.use(cors()); //Define os domínios que terão acesso à nossa aplicação. Daria para definir um objeto com origin para controlar isso.
//CORS = Cross-origin resource sharing

app.listen(3333);