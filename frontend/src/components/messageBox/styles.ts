const messageBoxStyles = {
  container:{
    display: 'flex',
    alignItems:'center',
    marginBottom: '20px',
    maxWidth: '40%',
  },
  messageContainer:{

    alignItems:'center',
    justifyContent:'center',
    padding: '10px 10px',
    marginLeft: '10px',
    borderRadius: '15px',
    fontFamily: 'Arial, sans-serif',
    color:'black',
    fontSize: '16px',
    width: '100%',
    overflowWrap: 'break-word'as const,
  },
  message:{
    margin: '0 10px 0 10px',
  },
  image:{
    width: '50px',
    height: '50px',
    borderRadius: '100px',
    objectFit: 'cover'as const,
  },
  posRight:{
    alignSelf:'flex-end',
    marginRight: '90px',

  },
  posleft:{
    alignSelf:'flex-start',
    marginLeft: '90px',
  },
  colourMessageLeft:{
    backgroundColor: 'rgb(243,164,140)'
  },
  colorMessageRight:{
    backgroundColor: 'rgb(239,122,86)'
  }
}

export default messageBoxStyles
