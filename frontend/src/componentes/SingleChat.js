import React, { Profiler } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import Perfil from "./miscellaneous/Perfil";
import UpdateGroupChat from './miscellaneous/UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();

  return (
    <>
        {selectedChat ? (
            <>
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3}
                    px={2}
                    w="100%"
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent={{ base: "space-between" }}
                    alignItems="center"
                >
                    <IconButton
                        display="flex"
                        icon={<ArrowBackIcon />}
                        onClick={() => setSelectedChat("")}
                    />
                    {!selectedChat.isGroupChat ? (
                        <> {getSender(user,selectedChat.users)}
                        <Perfil user={getSenderFull(user,selectedChat.users)}/>
                        </>
                    ) : (
                        <>
                            {selectedChat.chatName.toUpperCase()}
                            {<UpdateGroupChat
                            fetchAgain={fetchAgain}
                            setFetchAgain={setFetchAgain}
                        />}
                    </>
                    )}
                </Text>
                <Box   
                    display="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#E8E8E8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden">
                    
                </Box>
            </> 
        ) : (
            <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                    Clique em um usuário para iniciar a conversar                
                </Text>
            </Box>
        )}
    </>
  )
}

export default SingleChat