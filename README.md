
# 📡 BoraUni - Backend - API do Aplicativo de Carona Universitária

![Logo BoraUni](./assets/logo.png)

---

## 📖 Índice

- [1. Visão Geral](#1-visão-geral)
- [2. Como Rodar o Projeto](#2-como-rodar-o-projeto)
- [3. Scripts Disponíveis](#3-scripts-disponíveis)
- [4. Gerenciamento de Migrações com TypeORM](#4-gerenciamento-de-migrações-com-typeorm)
- [5. Arquitetura do Projeto](#5-arquitetura-do-projeto)
- [6. Considerações Finais](#6-considerações-finais)

---

## 1. Visão Geral

**Nome do Projeto:** BoraUni - Backend

**Descrição:**
O **BoraUni** Backend é a API que suporta o aplicativo mobile de carona compartilhada para universitários. Desenvolvido utilizando **Node.js**, **TypeScript**, **TypeORM** e **Tsyringe**, ele fornece todos os endpoints necessários para o gerenciamento de caronas, usuários e outras funcionalidades essenciais.

---

## 2. Como Rodar o Projeto

### Passo a Passo

1. **Clonar o Repositório**
   ```bash
   git clone <link>
   cd UPX-ADS-BACKEND
   ```

   > ⚠️ *Observação*: Caso tenha problemas com a chave SSH, solicite permissão para acesso ao repositório de forma segura, evitando a divulgação de chaves públicas. De qualquer forma recomendamos o download do zip para a nossa segurança

2. **Trocar para o Branch `develop`**
   ```bash
   git checkout develop
   ```

3. **Instalar Dependências**
   ```bash
   npm install
   ```

4. **Rodar o Docker**
   ```bash
   npm run dev:docker:up
   ```

   > Este comando executa `docker-compose up -d`, iniciando os containers necessários para o backend e o banco de dados.

5. **Rodar o Servidor**
   ```bash
   npm run dev
   ```

6. **Verificar**
   - Acesse `http://localhost:3000` para verificar se o servidor está rodando corretamente.

---

## 3. Scripts Disponíveis

No arquivo `package.json`, os seguintes scripts estão disponíveis para facilitar o desenvolvimento:

```json
"scripts": {
  "dev": "nodemon --watch src --exec ts-node -r tsconfig-paths/register src/index.ts",
  "dev:docker:up": "docker-compose up -d",
  "typeorm": "npx typeorm-ts-node-commonjs",
  "build": "tsc",
  "migration:run": "npm run typeorm migration:run -- --dataSource src/data-source.ts",
  "migration:revert": "npm run typeorm migration:revert -- --dataSource src/data-source.ts",
  "migration:create": "npx typeorm migration:create"
}
```

---

## 4. Gerenciamento de Migrações com TypeORM

### Criar uma Nova Migração

Para criar uma nova migração, execute:

```bash
npm run migration:create src/shared/database/migrations/<nome-da-migracao>
```

> Substitua `<nome-da-migracao>` pelo nome desejado para a migração.

### Executar Migrações

Para aplicar todas as migrações pendentes ao banco de dados:

```bash
npm run migration:run
```

### Reverter a Última Migração

Para desfazer a última migração executada:

```bash
npm run migration:revert
```

> ⚠️ *Nota*: Este comando reverte apenas a última migração. Para reverter múltiplas migrações, execute o comando múltiplas vezes.

### Limpar o Banco de Dados Local

Para limpar todos os dados do banco de dados local e remover todas as tabelas do Docker:

1. **Parar os Containers Docker**
   ```bash
   docker-compose down
   ```

 2. **Parar os Containers Docker (dados persistentes e volumes)**
      ```bash
      docker-compose down -v
      ```

3. **Remover apenas os Volumes Docker**
   ```bash
   docker volume prune
   ```

4. **Reiniciar os Containers Docker**
   ```bash
   npm run dev:docker:up
   ```

---

## 5. Arquitetura do Projeto

Adotamos a arquitetura **SOLID** para garantir que o sistema seja escalável, manutenível e de fácil entendimento. A estrutura do código é organizada em módulos que seguem essa arquitetura. Abaixo, explicamos o módulo de registro de usuários como exemplo.

### Estrutura do Módulo `register`

- **DTO (Data Transfer Object):** Define como os dados são transferidos entre as camadas da aplicação, validando e formatando as informações.

- **Controller:** Orquestra a comunicação entre a camada de entrada (API) e a lógica de negócios, recebendo requisições e delegando tarefas para o usecase.

- **Usecase:** Contém a lógica de negócios, processando operações como o registro de um usuário e comunicando-se com o repositório para persistência de dados.

- **Repository Interface:** Define os métodos que o repositório deve implementar, servindo como contrato para garantir a consistência.

- **Repository Implementation:** Implementa a interface do repositório, interagindo com o banco de dados utilizando o TypeORM.

- **Entity:** Representa o modelo de dados, mapeando a entidade para a estrutura real do banco de dados com o TypeORM.

### Outras Tecnologias e Práticas

- **Socket.io:** Implementa comunicação em tempo real entre os usuários, ideal para funções como notificações ou chat.

- **TypeORM:** Utilizado para gerar migrations e seeds, facilitando a criação da estrutura do banco de dados e a popularização inicial com dados fictícios.

- **Docker:** Cria um container do banco de dados PostgreSQL, garantindo isolamento e configuração idêntica em todos os ambientes de desenvolvimento.

- **DBeaver:** Ferramenta utilizada para consultas SQL e administração do banco de dados, permitindo visualizar, consultar e manipular dados de forma simples.

- **.env:** Armazena variáveis de ambiente, como configurações do banco de dados e porta do servidor, sendo carregado tanto para o Docker quanto para o `data-source.ts` do TypeORM.

- **Container.ts:** Realiza a injeção de dependência com o `tsyringe`, fornecendo dependências de forma eficiente e sem acoplamento entre as classes.

---

## 6. Considerações Finais

Caso tenha algum problema durante a execução do projeto ou dúvidas, entre em contato conosco para suporte.

---

<p align="center">Desenvolvido com ❤️ por Grupo 09 - 2025</p>
