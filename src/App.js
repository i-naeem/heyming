import React from 'react';
import {
  Box,
  Text,
  Link,
  theme,
  HStack,
  Heading,
  Container,
  IconButton,
  SimpleGrid,
  ChakraProvider,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { APP_NAME } from './configs/constants';
import UserInput from './components/UserInput';
import BitsArray from './components/BitsArray';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import useHammingCode from './services/HammingCode/useHammingCode';

function App() {
  const {
    hammingCode: bitsArray,
    getHammingCode,
    isLoading,
  } = useHammingCode();

  const onSubmit = (input, flag) => {
    const bits = input.split('').map(bit => parseInt(bit));
    getHammingCode(bits, flag);
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
            <Heading
              bgGradient="linear(to-r, teal.500, green.500)"
              bgClip="text"
              as={Link}
              href="/"
            >
              {APP_NAME}
            </Heading>
            <section>
              <IconButton
                size="md"
                as="a"
                fontSize="lg"
                marginLeft="2"
                target="_blank"
                color="current"
                variant="outline"
                icon={<FaGithub />}
                aria-label="Link to github source"
                href="https://github.com/i-naeem/heyming"
              />

              <ColorModeSwitcher justifySelf="flex-end" />
            </section>
          </HStack>
        </Container>
      </Box>

      {/* Main App */}
      <Box as="main" p={4} minH="calc(100vh - 70px - 70px)">
        <SimpleGrid columns={1}>
          <Box as="section" p="3">
            <UserInput onSubmit={onSubmit} isLoading={isLoading} />
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
          Developed by{' '}
          <Link target="_blank" href="http://github.com/i-naeem">
            Mohammad Naeem
          </Link>
        </Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
