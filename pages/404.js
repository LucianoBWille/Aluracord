export default function Custom404() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <h1>404 - Page Not Found</h1>
        <img
          style={{
            height: 'auto',
            width: 'auto',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
          src={
            'https://i1.wp.com/almanaquedabiblia.com.br/wp-content/uploads/2017/01/eLw7m.gif?resize=200%2C193'
          }
        ></img>
      </div>
    </>
  )
}
