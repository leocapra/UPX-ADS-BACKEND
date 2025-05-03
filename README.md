
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
