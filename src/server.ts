import express from 'express';
import path from "path";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(express.json()); //IMPORTANTE: .json() é uma função; não esqueça dos devidos parêntesis. :)
app.use(routes);
app.use("/uploads", express.static(path.resolve(__dirname,"..", "uploads"))); //para servir recursos estáticos como imagens
app.use(cors({
    origin: ["http://localhost:3000", "https://localhost:3000"]
}));
/*CORS = Cross-origin resource sharing
Define os domínios que terão acesso à nossa aplicação. Daria para definir um objeto com origin para controlar isso.
Se nao ativarmos isso, o nosso front-end nao tera como acessar o nosso back-end!
(O front esta no port 3000 e o back esta no port 3333.)*/

app.listen(3333);