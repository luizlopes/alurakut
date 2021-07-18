import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSideBar(propriedades) {
  console.log(propriedades);

  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
        <hr />
      </p>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelations({ title, relations }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({relations.length})
      </h2>

      <ul>
        {relations.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`/users/${itemAtual.title}`}>
                <img src={itemAtual.imageUrl} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

function convertUsersToRelations(stringList) {
  return (stringList.map((string) => {
    return (
      {
        id: string,
        title: string,
        imageUrl: `https://github.com/${string}.png`
      })
  }));
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function () {
    fetch('https://api.github.com/users/luizlopes/followers')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        console.log(respostaCompleta);
        const logins = respostaCompleta.map((contaGitHub) => { return contaGitHub.login; })
        return setSeguidores(logins);
      });

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '46a95fc168dffadc06a0c2361ccef8',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }
      ` })
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data.allCommunities);
        setComunidades(json.data.allCommunities);
      })
  }, []);

  const githubUser = "luizlopes";
  const pessoasFavoritas = ["juunegreiros", "peas", "omariosouto"];

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>
              Seja bem vindo
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que vc deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(event) {
              event.preventDefault();
              const formData = new FormData(event.target);

              const comunidade = {
                title: formData.get('title'),
                imageUrl: formData.get('image'),
                creatorSlug: githubUser
              };

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comunidade)
              }).then(async (response) => {
                const dados = await response.json();
                console.log(dados);
                setComunidades([...comunidades, dados.comunidade])
              })
            }}>
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelations title="Comunidades" relations={comunidades} />
          <ProfileRelations title="Pessoas da comunidade" relations={convertUsersToRelations(pessoasFavoritas)} />
          <ProfileRelations title="Meus seguidores" relations={convertUsersToRelations(seguidores)} />
        </div>
      </MainGrid>
    </>
  )
}
