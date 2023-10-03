import React from 'react'
import { Container, Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Login from "../componentes/autenticacao/Login";
import Cadastro from "../componentes/autenticacao/cadastro";


const Home = () => {
  return <Container maxW='xl' centerContent>
    <Box
      d="flex"
      justifyContent="center"
      p={2}
      bg={"transparent"}
      backdropFilter="blur(20px)"
      w="100%"
      m="20px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Text textAlign={"center"} fontSize={"2xl"} fontFamily={"Work sans"} fontWeight="bold">Easy Talk</Text>
    </Box>
    <Box bg={"transparent"} backdropFilter="blur(20px)" w="100%" p={"4"} borderRadius="lg" borderWidth="1px" >
      <Tabs variant='soft-rounded' colorScheme='pink'  color={"black"} >
        <TabList mb={"1em"}>
          <Tab width={"50%"} color={"black"}>Entrar</Tab>
          <Tab width={"50%"} color={"black"}>Cadastrar</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login/>
          </TabPanel>
          <TabPanel>
            <Cadastro/>
          </TabPanel>
        </TabPanels>
    </Tabs>
    </Box>
  </Container>
  
}

export default Home