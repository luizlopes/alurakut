# Aulas

## Aula 01

### Iniciando o projeto com o docker
$ docker run -it -v $(pwd):/app node /bin/bash 
$ cd /app
$ npx create-next-app --example with-styled-components

### Subindo o projeto
$ docker run -it -v $(pwd):/app -p 3000:3000 node /bin/bash 
$ cd /app
$ yarn dev

## Aula 02

### Prevenindo refresh de tela após submit de formulário
  * setando evento onSubmit `<form onSubmit={function handleCriaComunidade(event) { .. }}>`
  * utilizando o `event.preventDefault()` para evitar o refresh da tela
  * utilizando o `FormData(event.target)` e `formData.get('title')` para recuperar campos do formulário
  
### Trabalhando com state
  * utilizando o `[objeto, função set] = React.useState(...)` para criar e manipular objetos observáveis

