'use client'
import React, {ChangeEvent, FC, useState, useRef, useEffect} from 'react';
import chatInputStyles from "@/components/chatInput/styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowUp} from '@fortawesome/free-solid-svg-icons'
interface ChatInputProps {
  onSendMessage: (message: string) => void
}
const ChatInput: FC<ChatInputProps>= ({ onSendMessage }) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  const handleSendMessage = () => {
    onSendMessage(message)
    setMessage('') // clean input
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])
  return (
    <div style={chatInputStyles.container}>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder={'Escribe tu mensaje...'}
        style={chatInputStyles.textarea}
      />

      <button onClick={handleSendMessage} style={chatInputStyles.button}>
        <img src={"/images/sushibutton.png"} style={chatInputStyles.buttonImage}/>
      </button>
    </div>
  )
}

export default ChatInput
