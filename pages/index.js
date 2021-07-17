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
                <img src={itemAtual.image} />
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
        image: `https://github.com/${string}.png`
      })
  }));
}

export default function Home() {
  // const comunidades = ["Alurakut"];
  const [comunidades, setComunidades] = React.useState([{
    id: 12312312312,
    title: "Alurakut",
    image: "http://placehold.it/300x300"
  }]);

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
                id: new Date().toISOString(),
                title: formData.get('title'),
                image: formData.get('image')
              };
              setComunidades([...comunidades, comunidade])
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
