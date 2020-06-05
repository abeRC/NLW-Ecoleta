import express from "express";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

/*Métodos padrão: index (listagem), show (exibir um único registro), create/store, update, delete/destroy*/
const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

/*Lista todos os itens cadastrados. */
routes.get("/items", itemsController.index);

/*Lista pontos filtrando por cidade/estado/itens.*/
routes.get("/points", pointsController.index);

/*Cadastra um novo ponto de coleta.*/
routes.post("/points", pointsController.create);

/*Exibe informações sobre um ponto específico. */
routes.get("/points/:id", pointsController.show);


export default routes;
