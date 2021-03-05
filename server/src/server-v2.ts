import express from 'express';

/*Execução: npx ts-node-dev src/server.ts OU rode o script em package.json com npm run batata OU yarn batata.
ts-node-dev está em node_modules/.bin e vem do pacote node-dev para que a gente
não tenha que reiniciar manualmente o servidor toda vez que mudamos alguma coisa.*/

const users = [
  'Sir Lancelot the Brave',
  'Sir Galahad the Pure',
  'Sir Bedevere the Wise'
];

const app = express();

app.use(express.json()); //Returns (Express) middleware that only parses json and only looks at requests where the Content-Type header matches the type option.

//IMPORTANTE: .json() é uma função; não esqueça dos devidos parêntesis. :)



/*Rota (endereço completo da requisição): localhost:3333/users | recurso (entidade acessada): /users 
GET: buscar informações do back-end
POST: criar informações no back-end
PUT: atualizar informação existente no back-end
DELETE: remover informações do back-end

POST http://localhost:3333/users ---> listar usuários
POST http://localhost:3333/000000247 ---> buscar dados do usuário de ID 247
GET http://localhost:3333/users?search=dev ---> listar usuários pela palavra 'dev'

Testar requisições: Insomnia (so you can REST)*/
app.get("/users", (request, response) => {
    const search = String(request.query.search); //Se houver mais de um parâmetro de consulta, query.search será um array.
    console.log("query parameter: "+request.query.search +" | search: "+search);
    
    //se houver parametro de busca
    const filteredUsers = search ? (users.filter(user => user.includes(search)) ) : users;
    
    response.json(filteredUsers); //Lembra que queríamos usar JSON?
});

/*Request parameters: O dois-pontos indica um parâmetro de requisição, que vem na própria rota e identifica um recurso.
A rota (quase sempre) não sobrevive sem esse parâmetro.

Query parameters: Parâmetros opcionais para filtrar, paginar, etc. 
O nome é definido pela consulta em si, diferentemente dos parâmetros de requisição.

Request body: parâmetros para criação e atualização de informações no back-end.*/

app.get("/users/:foo", (request, response) => {
    const id = Number(request.params.foo);

    const user = users[id];

    return response.json(user);
})

app.post("/users", (request, response) => {
    const data = request.body;
    const user = {
        name: data.name,
        title: data.title,
        quality: data.quality
    };

    return response.json(user);
})

app.listen(3333);