'use client'
import React, {FC, useEffect, useRef} from 'react';
import messageBoxStyles from "@/components/messageBox/styles";
import chatStyles from "@/components/chat/styles";
import ChatInput from "@/components/chatInput/chatInput";
import MessageBox from "@/components/messageBox/messageBox";

type MessageType= {
  message:string,
  from:number
}

type ResponseType={
  intent: string,
  responseData: [],
  message: string
}

type requestType={
  message: string,
  context: string
}
const ChatContainer= () => {
  const [messageHistory, setMessageHistory] = React.useState<MessageType[]>([])
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth'})
    }
  };

  const handleMessageFromBot = (data: ResponseType) => {
    let messageRet=""
    switch (data.intent) {
      case 'greeting':
        messageRet=data.message
      break
      case 'byeMessage':
        messageRet+=data.message
      break
      case 'menuReturned':
        messageRet += `${data.message}: \n\n`
        data.responseData.forEach((item: any) => {
          messageRet += `Nombre: ${item.name}\n`
          messageRet += `Precio: ${item.price}$\n`
          messageRet += `Descripción: ${item.description}\n\n`
          messageRet += `   -----    \n\n`
        })

        break
      case 'askResponded':
        messageRet=data.message
      break
      case 'orderReceived':
        messageRet=data.message
        if(data.responseData){
          messageRet+=": \n\n"
          data.responseData.forEach((product: any)=>{
            messageRet+="- "+product.quantity+" "+ product.entity_name+"\n"
          })
        }
        break
      case 'orderConfirmed':
        let totalPrice=0
        if (data.responseData) {
          messageRet += `Cliente: ${data.responseData.clientName}\nEstado: ${data.responseData.status}\n\nProductos:\n`;

          data.responseData.products.forEach((item: any) => {
            messageRet += `- ${item.quantity} x ${item.product.name} (${item.product.price}$ c/u)\n`;
            totalPrice += item.quantity * item.product.price;
          });


          messageRet +=`\n PRECIO TOTAL: ${totalPrice}\n\n ${data.message}\n`
        }
        break;
      case 'fail':
        messageRet=data.message
        if(data.responseData){
          messageRet+=": \n\n"
          data.responseData.forEach((product: any)=>{
            messageRet+="- "+ product+"\n"
          })
        }
        break
      case 'unknownMessage':
        messageRet+=data.message
      break;
      default:
        messageRet="En este momento tengo problemas para trabajar intente mas tarde por favor."
    }

    return {message:messageRet, from:1}
  }

  const prepareMessage = (message: string) => {
    const context = messageHistory.slice(-4).map((message)=>message.message).join('\n')
    return {userMessage: message, context: context}
  }
  const onSendMessage = async (message: string) => {
    const messageToSend = prepareMessage(message)

    const messageFromUser = {message: message, from: 0}
    setMessageHistory((prevHistory)=>[...prevHistory, messageFromUser])
    const response = await fetch('http://localhost:3000/api/interact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message:messageToSend})
    })
    if(!response.ok){
      console.log('Error al enviar mensaje')
    }
    const data: ResponseType = await response.json()


    //todo evaluar evento y generar mensaje
    const messageFromBot =handleMessageFromBot(data)

    setMessageHistory((prevHistory)=>[...prevHistory, messageFromBot])

  }



  useEffect(() => {
    scrollToBottom()
  },[messageHistory]);
  return (
    <div style={chatStyles.container}>
      <div style={chatStyles.messages}>
        {
          messageHistory.map((message, index) => {
            return (
              <MessageBox
                key={index}
                message={message.message}
                position={message.from === 0 ? 'right' : 'left'}
              />
            );
          })
        }
      </div>
      <div style={chatStyles.chatInputContainer}>
        <ChatInput onSendMessage={onSendMessage} />
      </div>

    </div>
  )
}

export default ChatContainer
