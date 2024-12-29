const chatInputStyles = {
  container:{
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    width: '100%',
    padding: '10px 30px',

    backgroundColor: 'rgb(241,194,171)',
    borderRadius: '30px',



  },
  textarea:{
    flex:1,
    width: '50%',
    minHeight: '50px',
    maxHeight: '100px',
    padding: '16px 20px 0px 10px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: 'rgb(255,239,234)',
    fontFamily: 'Arial, sans-serif',
    color:'black',
    fontSize: '16px',
    outline: 'none',
    resize: 'none'as const,
    bottom: '0',
  },
  button: {
    padding: '0px',
    border:'none',
    backgroundColor: 'transparent',
    color: 'white',
    width:'48px',
    height:'auto',
    cursor: 'pointer',

  },
  buttonIcon:{
    color: 'white',
    fontSize: '20px'
  },
  buttonImage:{
    width: '48px',
    height: '48px',
    objectFit: 'cover'as const,
    margin: '0px',
    padding: '0px',


  }
}

export default chatInputStyles
