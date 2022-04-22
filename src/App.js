import React from 'react';
import {
  Box,
  Text,
  theme,
  HStack,
  Heading,
  Container,
  SimpleGrid,
  ChakraProvider,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { APP_NAME } from './configs/constants';
import UserInput from './components/UserInput';
import { useState } from 'react';
import BitsArray from './components/BitsArray';

function App() {
  const [bitsArray, setBitsArray] = useState([]);

  const onSubmit = input => {
    const bits = input.split('').map(bit => parseInt(bit));
    setBitsArray(bits);
  };
  return (
    <ChakraProvider theme={theme}>
      {/* Header */}
      <Box
        p={2}
        d="flex"
        as="header"
        shadow="sm"
        height={70}
        alignItems="center"
      >
        <Container maxW="container.xl">
          <HStack justifyContent="space-between">
            <Text>{APP_NAME}</Text>
            <ColorModeSwitcher justifySelf="flex-end" />
          </HStack>
        </Container>
      </Box>

      {/* Main App */}
      <Box as="main" p={4} minH="calc(100vh - 70px - 70px)">
        <SimpleGrid columns={1}>
          <Box as="section" p="3">
            <UserInput onSubmit={onSubmit} />
          </Box>
          {bitsArray.length ? (
            <Box as="section" p="3">
              <Heading size="lg" mb="3">
                Hamming Code
              </Heading>

              <BitsArray bitsArray={bitsArray} />
            </Box>
          ) : null}
        </SimpleGrid>
      </Box>

      {/* Footer */}
      <Box
        p={2}
        d="flex"
        shadow="sm"
        as="footer"
        height={70}
        borderTop="1px"
        alignItems="center"
        borderColor="gray.700"
      >
        <Text align="center" flexGrow={1}>
          &copy; 2022 - {APP_NAME}
        </Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
