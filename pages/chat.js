import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import React from 'react'
import appConfig from '../config.json'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzgyNjQyNCwiZXhwIjoxOTU5NDAyNDI0fQ.De-4rHn2sbwtjHvojQe-teiz0Tf7sJYcLkIF6dODD2E'
const SUPABASE_URL = 'https://itoosvzpgbquaxamcxic.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// function escutaAddMensagensEmTempoReal(adicionaMensagem) {
//   return supabaseClient
//     .from('mensagens')
//     .on('INSERT', response => {
//       console.log('Escutou ADD: ', response.new)
//       adicionaMensagem(response.new)
//     })
//     .subscribe()
// }

// function escutaDelMensagensEmTempoReal(removeMensagem) {
//   return supabaseClient
//     .from('mensagens')
//     .on('DELETE', response => {
//       console.log('Escutou DEL: ', response.old)
//       removeMensagem(response.old)
//     })
//     .subscribe()

function mensagensEmTempoReal(atualizaListaDeMensagens) {
  return supabaseClient
    .from('mensagens')
    .on('*', payload => {
      // console.log('Change received!', payload)
      atualizaListaDeMensagens(payload)
    })
    .subscribe()
}

export default function ChatPage() {
  const roteamento = useRouter()
  const usuarioLogado = String(roteamento.query.username).toLowerCase()
  const [mensagem, setMensagem] = React.useState('')
  const [listaDeMensagens, setListaDeMensagens] = React.useState([
    // {
    //   id: 1,
    //   de: 'lucianobwille',
    //   texto:
    //     ':sticker:https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_1.png'
    // }
  ])

  React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data)
      })
    // const subscritionInsert = escutaAddMensagensEmTempoReal(novaMensagem => {
    //   console.log('Nova mensagem:', novaMensagem)
    //   setListaDeMensagens(valorAtualDaLista => {
    //     return [novaMensagem, ...valorAtualDaLista]
    //   })
    // })
    // const subscritionDelete = escutaDelMensagensEmTempoReal(velhaMensagem => {
    //   console.log('Velha mensagem:', velhaMensagem)
    //   setListaDeMensagens(valorAtualDaLista => {
    //     return valorAtualDaLista.filter(
    //       mensagem => mensagem.id !== velhaMensagem.id
    //     )
    //   })
    // })
    const subscrition = mensagensEmTempoReal(payload => {
      // console.log('Mensagem:', payload)
      setListaDeMensagens(valorAtualDaLista => {
        // console.log('valorAtualDaLista', valorAtualDaLista)
        // console.log('payload.new', payload.new)
        // console.log('payload.old', payload.old)
        // console.log('add', [payload.new, ...valorAtualDaLista])
        // console.log(
        //   'del',
        //   valorAtualDaLista.filter(mensagem => mensagem.id !== payload.old.id)
        // )
        if (payload.new && Object.keys(payload.new).length !== 0) {
          return [payload.new, ...valorAtualDaLista]
        } else {
          if (payload.old && Object.keys(payload.old).length !== 0) {
            return valorAtualDaLista.filter(
              mensagem => mensagem.id !== payload.old.id
            )
          }
        }
      })
    })
    return () => {
      // subscritionInsert.unsubscribe()
      // subscritionDelete.unsubscribe()
      subscrition.unsubscribe()
    }
  }, [])

  /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */
  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      // id: (listaDeMensagens[0] ? listaDeMensagens[0].id || 0 : 0) + 1,
      de: usuarioLogado,
      texto: novaMensagem
    }

    supabaseClient
      .from('mensagens')
      .insert([mensagem])
      .then(({ data }) => {
        // console.log('Criando mensagem:', data)
        // setListaDeMensagens([data[0], ...listaDeMensagens])
      })

    setMensagem('')
  }
  function deleteMesage(id) {
    // console.log(listaDeMensagens.filter(mensagem => mensagem.id !== id))
    supabaseClient
      .from('mensagens')
      .delete()
      .eq('id', id)
      .then(data => {
        // console.log('Removendo mensagem:', data)
        // setListaDeMensagens([
        //   ...listaDeMensagens.filter(mensagem => mensagem.id !== id)
        // ])
      })
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://cutewallpaper.org/21/rick-and-morty-wallpapers-1920x1080/277-Rick-and-Morty-HD-Wallpapers-Background-Images-.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px'
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px'
          }}
        >
          <MessageList
            mensagens={listaDeMensagens}
            deleteMesage={deleteMesage}
            usuarioLogado={usuarioLogado}
          />
          {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <TextField
              value={mensagem}
              onChange={event => {
                const valor = event.target.value
                setMensagem(valor)
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleNovaMensagem(mensagem)
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                // marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200]
              }}
            />
            <ButtonSendSticker
              onStickerClick={sticker => {
                handleNovaMensagem(`:sticker:${sticker}`)
              }}
            />
            <Button
              label="OK"
              onClick={event => {
                handleNovaMensagem(mensagem)
              }}
              styleSheet={{
                marginBottom: '8px'
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600]
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  // console.log(props)
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px'
      }}
    >
      {props.mensagens.length === 0
        ? 'We are loading the mensages...'
        : props.mensagens.map((mensagem, i) => {
            return (
              <Text
                key={i}
                tag="li"
                styleSheet={{
                  borderRadius: '5px',
                  padding: '6px',
                  marginBottom: '12px',
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[700]
                  }
                }}
              >
                <Box
                  styleSheet={{
                    marginBottom: '8px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Image
                    styleSheet={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'inline-block',
                      marginRight: '8px',
                      hover: {
                        transform: 'scale(3.5) translate(6px) translateY(6px)',
                        border: `1px solid ${appConfig.theme.colors.neutrals[500]}`
                      }
                    }}
                    src={`https://github.com/${mensagem.de}.png`}
                  />
                  <Text tag="strong">{mensagem.de}</Text>
                  <Text
                    styleSheet={{
                      fontSize: '10px',
                      marginLeft: '8px',
                      color: appConfig.theme.colors.neutrals[300]
                    }}
                    tag="span"
                  >
                    {mensagem.created_at
                      ? new Date(mensagem.created_at).toLocaleDateString()
                      : null}
                  </Text>
                </Box>
                <Box
                  styleSheet={{
                    marginBottom: '8px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    {mensagem.texto.startsWith(':sticker:') ? (
                      <Image
                        src={mensagem.texto.replace(':sticker:', '')}
                        styleSheet={{ maxHeight: '150px', maxWidth: '150px' }}
                      />
                    ) : (
                      mensagem.texto
                    )}
                  </div>
                  {String(mensagem.de).toLowerCase() ===
                  String(props.usuarioLogado).toLowerCase() ? (
                    <Button
                      label="X"
                      onClick={event => {
                        event.preventDefault()
                        props.deleteMesage(mensagem.id)
                      }}
                      buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals['000'],
                        mainColor: appConfig.theme.colors.neutrals[500],
                        mainColorLight: appConfig.theme.colors.neutrals[400],
                        mainColorStrong: appConfig.theme.colors.neutrals[600]
                      }}
                    />
                  ) : null}
                </Box>
              </Text>
            )
          })}
    </Box>
  )
}
