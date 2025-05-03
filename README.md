
# 📡 BoraUni - Backend - API do Aplicativo de Carona Universitária

![Logo BoraUni](./assets/logo.png)

---

## Índice

- [1. Visão Geral](#1-visão-geral)
- [2. Como Rodar o Projeto](#2-como-rodar-o-projeto)
- [3. Considerações Finais](#3-considerações-finais)

---

## 1. Visão Geral

**Nome do Projeto:** BoraUni - Backend

**Descrição:**
O **BoraUni** Backend é a API que suporta o aplicativo mobile de carona compartilhada para universitários. Desenvolvido utilizando **Node.js**, **TypeScript**, **TypeORM** e **Tsyringe**, ele fornece todos os endpoints necessários para o gerenciamento de caronas, usuários e outras funcionalidades essenciais.

---

## 2. Como Rodar o Projeto

### Passo a Passo

1. **Clonar o Repositório**
   - Clone o repositório ou faça o download do arquivo ZIP do projeto:
     ```bash
     git clone <link>
     cd UPX-ADS-BACKEND
     ```

**Observação**: Caso tenha problemas com a chave SSH, você pode pedir a permissão para acesso ao repositório de forma segura, visto que não podemos divulgar a chave pública por questões de segurança.

2. **Trocar para o Branch `develop`**
   - Após clonar o projeto, mude para o branch `develop`:
     ```bash
     git checkout develop
     ```

3. **Instalar Dependências**
   - No diretório raiz do projeto, instale as dependências com o NPM (Node Package Manager). Se não tiver o NPM instalado, [consulte a documentação oficial do Node.js](https://nodejs.org/en/docs/) para mais detalhes:
     ```bash
     npm install
     ```

4. **Rodar o Docker**
   - Caso você queira rodar o backend com Docker, certifique-se de que o Docker está instalado em sua máquina. Com o Docker instalado, execute:
     ```bash
     npm run dev:docker
     ```

   Isso vai rodar o comando `docker-compose up -d`, que inicia os containers necessários para o backend e o banco de dados.

5. **Rodar o Servidor**
   - Agora, execute o servidor com o comando:
     ```bash
     npm run dev
     ```

6. **Verificar**
   - Se tudo estiver correto, o servidor estará rodando no `http://localhost:3000`.

---

## 3. Considerações Finais

Caso tenha algum problema durante a execução do projeto ou dúvidas, entre em contato comigo no número **15981518395** para suporte.

---

<p align="center">Desenvolvido com ❤️ por Grupo 09 - 2025</p>

Explicação da Arquitetura do Backend
No backend, adotamos a arquitetura SOLID para garantir que o sistema seja escalável, manutenível e de fácil entendimento. A estrutura do código é organizada em módulos que seguem essa arquitetura, e o exemplo que vamos explicar é o módulo de register (registro de usuários).

Estrutura do Módulo register
register/dto/dto.ts

O DTO (Data Transfer Object) é uma estrutura que define como os dados são transferidos entre as camadas da aplicação. Ele valida e formata as informações que serão enviadas ou recebidas pelo sistema, mantendo a integridade dos dados.

register/usecases/controller.ts

O controller é responsável por orquestrar a comunicação entre a camada de entrada (API, por exemplo) e a lógica de negócios. Ele recebe as requisições e delega as tarefas para o usecase. Ele pode também formatar a resposta antes de enviá-la de volta ao cliente.

register/usecases/usecase.ts

O usecase contém a lógica de negócios. Aqui é onde processamos as operações que o sistema deve realizar, como registrar um usuário. Ele faz a comunicação com o repository para persistir ou recuperar dados.

register/repository/irepository.ts

A interface do repository define os métodos que o repositório deve implementar, mas não a implementação real. Ela serve como contrato, garantindo que qualquer implementação do repositório siga a mesma estrutura e tenha a mesma funcionalidade.

register/repository/implementation/repository.ts

A implementação do repository é onde realmente interagimos com o banco de dados. Usamos TypeORM para fazer as consultas e manipulações dos dados. O repositório é responsável por garantir a persistência dos dados de forma eficiente e segura.

register/entity/entity.ts

A entity representa o modelo de dados, ou seja, a tabela no banco de dados. Usamos TypeORM para mapear essa entidade para a estrutura real do banco de dados, permitindo que possamos realizar operações de criação, leitura, atualização e exclusão (CRUD).

Outras Tecnologias e Práticas
Socket.io: Usamos o Socket.io no index.ts (nosso arquivo server.ts) para implementar a comunicação em tempo real entre os usuários. Isso permite que o sistema envie e receba mensagens em tempo real, ideal para funções como notificações ou chat.

TypeORM: Para gerar as migrations e seeds, usamos o TypeORM, que ajuda na criação da estrutura do banco de dados e na popularização inicial com dados fictícios. Isso facilita o ambiente de desenvolvimento, garantindo que todos os desenvolvedores tenham uma base de dados consistente.

Docker: Utilizamos o Docker para criar um container do banco de dados PostgreSQL. O Docker garante que o banco esteja isolado e configurado de forma idêntica em todos os ambientes de desenvolvimento, sem causar conflitos com a máquina local de cada desenvolvedor.

DBeaver: Para facilitar as consultas SQL e administração do banco de dados, usamos o DBeaver, uma ferramenta poderosa que nos permite visualizar, consultar e manipular os dados do banco de forma simples.

.env: Utilizamos o arquivo .env para armazenar variáveis de ambiente, como a configuração do banco de dados, a porta do servidor, e outras informações sensíveis. Esse arquivo é carregado tanto para o Docker quanto para o data-source.ts do TypeORM, garantindo que o banco e o servidor utilizem as configurações corretas.

Container.ts: A injeção de dependência é realizada com tsyringe no arquivo container.ts. Esse arquivo garante que as dependências do projeto sejam fornecidas de forma eficiente e sem acoplamento entre as classes, seguindo o princípio da inversão de dependência da arquitetura SOLID.

Resumo da Arquitetura
SOLID é seguido rigorosamente, garantindo a manutenção e escalabilidade do sistema.

A estrutura de cada módulo é dividida em DTOs, Usecases, Repositories, e Entities.

Usamos TypeORM para persistência de dados, Socket.io para comunicação em tempo real e Docker para isolar o ambiente de banco de dados.

A injeção de dependência é feita com tsyringe, mantendo o código limpo e desacoplado.

Essa estrutura modular facilita a compreensão e manutenção do código, além de seguir as melhores práticas de design de software.
