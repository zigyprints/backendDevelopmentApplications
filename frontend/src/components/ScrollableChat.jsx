import { Avatar, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { isLastMessage, isSameSender, isSameSenderMargin } from '../config/ChatLogic'
import { ChatState } from '../Context/ChatProvider'
const ScrollableChat = ({messages}) => {
    const {user} = ChatState();
  return (
    <div>
            {messages && messages.map((m,i)=>(
                <div style={{display:"flex"}} key={m._id}>
                {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
                style={{backgroundColor:`${
                    m.sender._id===user._id?"#BEE3F8":"#89F5D0"
                }`,
                borderRadius:"20px",
                padding:"5px 15px",
                maxWidth:"75%",
                marginLeft:isSameSenderMargin(messages,m,i,user._id),

                }}
            >
            {m.content}
            </span>
                </div>
            ))}
    </div>
  )
}

export default ScrollableChat
