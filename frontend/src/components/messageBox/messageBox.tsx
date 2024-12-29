'use client'
import React, {FC} from 'react';
import messageBoxStyles from "@/components/messageBox/styles";

interface MessageBoxProps {
  message: string,
  position: 'left'|'right'
}
const MessageBox: FC<MessageBoxProps>= ({ message , position}) => {
  const posStyle= position=='left' ? messageBoxStyles.posleft : messageBoxStyles.posRight
  const messageBoxColour = position == 'left' ? messageBoxStyles.colourMessageLeft : messageBoxStyles.colorMessageRight

const convertNewLinesToBreaks = (str: string) => {
    return str.split('\n').map((part, index) => (
      <React.Fragment
        key={index}>
        {part}
        <br />
      </React.Fragment>
    ))
  }
  return (
    <div style={{ ...messageBoxStyles.container, ...posStyle }}>
      {position == 'left' &&
      <img src={"/images/robo1.jpg"} style={messageBoxStyles.image}/>}
      <div style={{...messageBoxStyles.messageContainer, ...messageBoxColour}}>
        <div style={messageBoxStyles.message}>
          {convertNewLinesToBreaks(message)}
        </div>

      </div>
    </div>
  )
}

export default MessageBox
