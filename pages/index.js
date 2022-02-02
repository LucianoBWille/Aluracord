import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appConfig from '../config.json'
import { useState } from 'react'
import { useRouter } from 'next/router'

function Titulo(props) {
  const Tag = props.tag || 'h1'
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
  // const username = 'LucianoBWille'
  const [userId, setUserId] = useState('LucianoBWille')
  // const [userData, setUserData] = useState({ name: userId })

  const roteamento = useRouter()
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            'url(https://cutewallpaper.org/21/rick-and-morty-wallpapers-1920x1080/277-Rick-and-Morty-HD-Wallpapers-Background-Images-.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
          // backgroundBlendMode: 'multiply'
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row'
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '5px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700] + 'ee'
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={event => {
              event.preventDefault()
              roteamento.push('/chat')
            }}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' },
              textAlign: 'center',
              marginBottom: '32px'
            }}
          >
            <Titulo tag="h2">Welcome!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals[300]
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800]
                }
              }}
              value={userId}
              min={2}
              onChange={event => {
                setUserId(event.target.value)
                // fetch(`https://api.github.com/users/${event.target.value}`, {
                //   method: 'GET'
                // }).then(response => {
                //   response.json().then(function (data) {
                //     setUserData(data)
                //   })
                // })
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600]
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            as="a"
            href={`https://github.com/${userId}`}
            target="_blank"
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px'
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                objectFit: 'cover',
                height: '160px',
                width: '160px'
              }}
              src={
                userId.length > 2
                  ? `https://github.com/${userId}.png`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTVl1FYFsRH7ezNbbP8_KL5GHIbud6s1VhRA&usqp=CAU'
              }
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {/* {userData.name}
               */}
              {userId}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  )
}
