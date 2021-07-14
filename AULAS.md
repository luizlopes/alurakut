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

