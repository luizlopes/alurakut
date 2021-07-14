import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSideBar(propriedades) {
  console.log(propriedades);

  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const githubUser = "luizlopes";
  const pessoasFavoritas = ["juunegreiros", "peas", "omariosouto"]

  return (
    <>
      <AlurakutMenu />
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
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
