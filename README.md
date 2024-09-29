# 📖 Bem-vindo(a) à API de magic! 

Este README fornece uma descrição detalhada das funcionalidades e requisitos para a criação e desenvolvimento da nossa aplicação mágica do jogo de estratégia Magic! 🌟⚔️🧙‍♂️

## ✨ Funcionalidades

1. *🧙 Criação de Entidade de Usuário com Autenticação JWT*

2. *🔒 Auth Guard*:
   - Adicione um Auth Guard para as rotas da entidade principal da sua aplicação.
   - Somente usuários autenticados poderão chamar essas rotas.

3. *📏 Criação de decks*

4. *🎲 Gerenciamento de multiplos baralhos*

5. *🧠 Listagem de baralhos*

6. *📦 Importação de decks via json* 

7. *🗄️ Armazenamento em banco de dados Redis*

8. *📊 Cacheamento de listagem de decks*

9. *🚀 Melhoria de performance utilizando cluster*

10. *💡 Utilização de Node.js streams*


## 🛠️ Dependências

- Node.js 20.12.2
- TypeScript
- JWT
- Class-validator
- JSONStream
- Compression
- Mongoose
- Redis
- Bcrypt
- Cache Manager

## 🌐 Rotas da API

#### Auth
- *POST* /auth/register - Registro de novo usuário
- *POST* /auth/login - Autenticação de usuário

#### Deck
- *GET* /decks/create-deck - Criação de novo deck
- *POST* /decks/upload-deck - Importação e validação de deck via json
- *GET* /decks/ - Lista todos os decks do banco
- *GET* /decks/fetch-commander - Busca commander
- *GET* /decks/user-decks - Lista todos os decks de um usuário


## 🏃‍♂️ Como Rodar a Aplicação

- Clone o repositório.
bash
git clone <https://github.com/SenhorAfonso/project-magic-the-gathering>

- Configure as variáveis de ambiente necessárias. 

❗ Crie um arquivo .env na raiz do projeto com base no arquivo .env.example. ❗

- Instale as Dependências

npm install

- Inicie a API

npm run start

- Utilize os endpoints da API conforme documentado.

## 🎐 Conheça os desenvolvedores

- 👨‍💻 [Pedro Afonso](https://github.com/SenhorAfonso)
- 👩‍💻 [Rhayssa Andretto](https://github.com/rhayssaandretto)
- 👨‍💻 [Vinicius Kenji](https://github.com/TalDoKenji)


