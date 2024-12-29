const chatStyles = {
  container:{
    overflowY: 'auto'as const,
    width: '100%',
    maxHeight:'100vh',
    padding: '0 25% 0 25%',
    justifyContent: 'flex-end'as const,


  },
  messages:{
    display: 'flex',
    flexDirection: 'column'as const,
    width: '100%',
    padding:'15px 0 55px 0',


  },
  chatInputContainer:{
    position: 'absolute' as const,
    width:"100%",
    padding: '0 25% 0 25%',
    bottom: '20px',
    left: '0',
    display: 'flex',
    justifyContent: 'center' as const,


  }
}

export default chatStyles
