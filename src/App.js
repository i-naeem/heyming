import React from 'react';
import {
  ChakraProvider,
  theme,
  Text,
  HStack,
  Container,
  Box,
  Heading,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { APP_NAME } from './configs/constants';

function App() {
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
        <Heading>Hello, Friend</Heading>
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
