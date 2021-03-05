import express from "express";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";
import cors from "cors";
import multer from "multer";
import multerConfig from "./config/multer";
import { celebrate, Joi } from "celebrate";
/*OBS: Pra instalar os types, faça npm install @types/hapi__joi -D*/


/*Métodos padrão: index (listagem), show (exibir um único registro), create/store, update, delete/destroy*/
const routes = express.Router();

/*multer + config 
Lembre de passar isso junto com as rotas que envolvem uplaod de imagens!*/
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.use(cors({
	origin: ["http://localhost:3000", "https://localhost:3000"]
})); 
/*CORS = Cross-origin resource sharing
Define os domínios que terão acesso à nossa aplicação. Daria para definir um objeto com origin para controlar isso.
Se nao ativarmos isso, o nosso front-end nao tera como acessar o nosso back-end!
(O front esta no port 3000 e o back esta no port 3333.)*/


/*Lista todos os itens cadastrados. */
routes.get("/items", itemsController.index);

/*Lista pontos filtrando por cidade/estado/itens.*/
routes.get("/points", pointsController.index);

/*Exibe informações sobre um ponto específico. */
routes.get("/points/:id", pointsController.show);

/*Cadastra um novo ponto de coleta e faz validação de dados..*/
routes.post(
	"/points", 
	upload.single("image"), 
	celebrate({
		body: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			whatsapp: Joi.number().required(),
			latitude: Joi.number().required(),
			longitude: Joi.number().required(),
			cidade: Joi.string().required(),
			estado: Joi.string().required().max(2),
			items: Joi.string().required(),
		})
	},{
		abortEarly: false
	}),
	pointsController.create
);


export default routes;
