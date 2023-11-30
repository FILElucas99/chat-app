import React from 'react'
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    Box,
  } from "@chakra-ui/react";
import UserListItem from '../UsuárioAvatar/UserListItem';
import UserBadgeItem from '../UsuárioAvatar/UserBadgeItem';

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const toast = useToast();
  
    const { user, chats, setChats } = ChatState();

    const handleSearch =async (query) => {
        setSearch(query)
        if(!query){
            return;
        }
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get(`/api/user?search=${search}`, config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch(error){
            toast({
                title: "Ocorreu um erro!",
                description: "Falha ao carregar os resultados da pesquisa",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
        }
    };

    const handleSubmit = async () => {
        if(!groupChatName || !selectedUsers) {
            toast({
                title: "Por favor preencha todos os campos",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
              return;
        }
        try {
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.post(`/api/chat/group`,
              {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id)),
              },
              config
            );
            setChats([data, ...chats]);
            onClose();
            toast({
              title: "Grupo criado!",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          } catch (error) {
            toast({
              title: "Falha ao criar o chat!",
              description: error.response.data,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
        };

    const handleGroup = (userToAdd) => {
        if(selectedUsers.includes(userToAdd)) {
            toast({
                title: "Usuário já adicionado.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
        }
        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(
            selectedUsers.filter((sel) => sel._id !== delUser._id)
        );
    };

    return (
        <>
          <span onClick={onOpen}>{children}</span>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader            
                fontSize="35px"
                fontFamily="Work sans"
                display="flex"
                justifyContent="center">Criar Chat de Grupo</ModalHeader>
              <ModalCloseButton />
              <ModalBody display="flex" flexDir="column" alignItems="center">
                <FormControl> 
                    <Input placeholder='Nome do Grupo' mb={3} onChange={(e) => setGroupChatName(e.target.value)}/>
                </FormControl>
                <FormControl> 
                    <Input placeholder='Adicionar Usuários' mb={1} onChange={(e) => handleSearch(e.target.value)}/>
                </FormControl>
                    <Box w="100%" display="flex" flexWrap="wrap">
                        {selectedUsers.map(u => (
                            <UserBadgeItem key={user._id} user={u} handleFunction={() => handleDelete(u)}/>
                        ))}
                    </Box>
                { loading ? ( 
                    <div>Buscando...</div> 
                ) : (
                    searchResult?.slice(0,4).map((user) => (
                        <UserListItem key={user._id} userData={user} handleFunction={() => handleGroup(user)}/>
                    ))
                )}
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                  Criar Grupo
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal