import express from "express";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";
import cors from "cors";

/*Métodos padrão: index (listagem), show (exibir um único registro), create/store, update, delete/destroy*/
const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.use(cors({
    origin: "http://localhost:3000"
})); 
/*CORS = Cross-origin resource sharing
Define os domínios que terão acesso à nossa aplicação. Daria para definir um objeto com origin para controlar isso.
Se nao ativarmos isso, o nosso front-end nao tera como acessar o nosso back-end!
(O front esta no port 3000 e o back esta no port 3333.)*/


/*Lista todos os itens cadastrados. */
routes.get("/items", itemsController.index);

/*Lista pontos filtrando por cidade/estado/itens.*/
routes.get("/points", pointsController.index);

/*Cadastra um novo ponto de coleta.*/
routes.post("/points", pointsController.create);

/*Exibe informações sobre um ponto específico. */
routes.get("/points/:id", pointsController.show);


export default routes;
