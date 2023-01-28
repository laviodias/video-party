Este projeto criado com NextJS e Typescript tem por objetivo permitir que pessoas criem salas para assistirem videos com amigos. Para facilitar a interação, existe um chat em cada sala. É possível criar uma nova sala ou se juntar a uma existente.

Ao criar uma sala, é preciso informar uma URL para o vídeo que será exibido, bem como seu nome e um título para a sala.

Para conversar no chat também é preciso informar o seu nome.

A aplicação pode ser acessada em produção [neste link](https://video-party-iota.vercel.app/)

O Banco de Dados escolhido foi o (Airtable)[https://www.airtable.com] e o gerenciamento do servidor é feito também no NextJS.

Caso deseje rodar o projeto localmente, siga os passos seguintes:

 1. Clone o repositório
 2. Utilizando uma versão do NodeJs igual ou superior a 16.0.0, instale as dependências:
  ```
  npm install
  # ou
  yarn install
  ```

 3. Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver o resultado.

 4. Para que o Banco de Dados possa funcionar corretamente, é preciso configurar algumas variáveis de ambiente:
```
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
AIRTABLE_TABLE_NAME=
BASE_URL=http://localhost:3000
```
Se necessário, entre em contato comigo para que eu possa fornecer uma chave de exemplo. 

Caso queira criar por conta própria, aqui estão as colunas utilizadas pelo banco de dados:
![image](https://user-images.githubusercontent.com/44332001/215239735-45e3b5fc-75fc-41d6-976f-dd85d806751a.png)


