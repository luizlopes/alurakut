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


## Aula 03

### Fazendo requests com o fetch
  * funcionamento da função fetch
  * trabalhando com Promises em cadeia com o `.then(fun)`
  * capturando erros com o `.catch(fun)`

### Usando o useEffect
  * usando o React.useEffect(fun, []) para chamar a função que populará a lista de seguidores após render da página (e sem ficar em looping)
    texto extraído da doc do ReactJS (https://pt-br.reactjs.org/docs/hooks-reference.html#useeffect)
    "Se você passar um array vazio ([]), a props e o state passados dentro do efeito sempre terão seus valores iniciais. Enquanto passando [] como segundo parâmetro aproxima-se do modelo mental familiar de componentDidMount e componentWillUnmount, geralmente hás melhores soluções para evitar efeitos repetidos com muita freqüência. Além disso, não esqueça de que o React adia a execução do useEffect até o navegador ser pintado, então fazer trabalho extra é menos problemático."


## Aula 04

###