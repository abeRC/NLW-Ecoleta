import express from 'express';
/*Quando usamos o TypeScrypt, além de instalar a biblioteca, também precisamos instalar suas definições de tipos.
Algumas bibliotecas já vem com isso, mas não no caso do express.
ProTip: ´npm install @types/express -D´ instala essas definições de tipo como dependências de desenvolvimento,
indicando que não é necessária para produção.

Outra coisa: toda vez que criamos uma aplicação TypeScript, precisamos de um arquivo de configuração
indicando quais recursos do TypeScript vamos utilizar.



Execução: npx ts-node-dev src/server.ts OU rode o script em package.json com npm run batata OU yarn batata.
ts-node-dev está em node_modules/.bin e vem do pacote node-dev para que a gente
não tenha que reiniciar manualmente o servidor toda vez que mudamos alguma coisa.*/

const app = express();
app.get("/users", (request, response) => {
    /*Rota (endereço completo da requisição): localhost:3333/users | recurso (entidade acessada): /users 
    GET: buscar informações do back-end
    POST: criar informações no back-end
    PUT: atualizar informação existente no back-end
    DELETE: remover informações do back-end
    
    POST http://localhost:3333/users ---> listar usuários
    POST http://localhost:3333/000000247 ---> buscar dados do usuário de ID 247 
    
    Testar requisições: Insomnia (so you can REST)*/
    console.log("listagem de usuários");

    //response.send("Hello, world!");
    //response.status(411).send("Oh..."); //A chamada para status() seta o status e o send() envia a resposta.
    response.json([ //missing a return?
      'Sir Lancelot the Brave',
      'Sir Galahad the Pure',
      'Sir Bedevere the Wise'
    ]); //Lembra que queríamos usar JSON?
});

//https://www.w3schools.com/js/js_arrow_function.asp
/* versão 1
hello = function() {
  return "Hello World!";
}  

//versão 2
hello = () => {
  return "Hello World!";
}

//versão 3
hello = () => "Hello World!";

//com parâmetros
hello = (val) => "Hello " + val; 


Cuidado com `this`!
In regular functions the this keyword represented the object that called the function, 
which could be the window, the document, a button or whatever.
With arrow functions the this keyword always represents the object that defined the arrow function.*/

app.post("/users", (request, response) => {
    const user = {
        nome: "Galahad",
        titulo: "Sir",
        qualidade: "the Pure"
    }

    return response.json(user);
})

app.listen(3333);