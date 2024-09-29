# Users Frontend

Este é um projeto frontend para gerenciamento de usuários, desenvolvido com React, TypeScript e Vite.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build rápida para projetos web modernos.
- **Chakra UI**: Biblioteca de componentes para React.
- **React Query**: Biblioteca para gerenciamento de estado assíncrono.
- **React Hook Form**: Biblioteca para gerenciamento de formulários.
- **Yup**: Biblioteca para validação de schemas.
- **Axios**: Cliente HTTP baseado em Promises.
- **React Toastify**: Biblioteca para exibição de notificações.
- **React Paginate**: Componente de paginação para React.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:

  ```sh
  git clone https://github.com/seu-usuario/users-frontend.git
  ```

2. Navegue até o diretório do projeto:

  ```sh
  cd users-frontend
  ```

3. Instale as dependências:

  ```sh
  npm install
  ```

  ou

  ```sh
  yarn install
  ```

## Configuração

1. Crie um arquivo [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Falessandrordgs%2Fprojetos%2Fsupera%2Fusers-frontend%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%225a9fc6a0-5627-4f04-aeda-c65a0940f472%22%5D "/home/alessandrordgs/projetos/supera/users-frontend/.env") na raiz do projeto e adicione a URL base da API:

  ```env
  VITE_ENDPOINT_BASE_URL=http://localhost:8004
  ```

## Execução

Para iniciar o servidor de desenvolvimento, execute:

```sh
npm run dev