import React from 'react';
import {
  Box,
  theme,
  Button,
  Heading,
  SimpleGrid,
  ChakraProvider,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UserInput from './components/UserInput';
import BitsArray from './components/BitsArray';
import useHammingCode from './services/HammingCode/useHammingCode';

function App() {
  const {
    parity,
    bitsArray,
    isLoading,
    efficiency,
    dataBitSize,
    getHammingCode,
    redundantBitsSize,
  } = useHammingCode();

  const [dataBits, setDataBits] = useState([]);

  const onSubmit = (input, flag) => {
    const bits = input.split('').map(bit => parseInt(bit));
    setDataBits(() => bits);
    getHammingCode(bits, flag);
  };
  return (
    <ChakraProvider theme={theme}>
      <Header />

      <Box as="main" p={4} minH="calc(100vh - 70px - 70px)">
        <SimpleGrid columns={1}>
          <Box as="section" p="3" mb="3">
            <UserInput onSubmit={onSubmit} isLoading={isLoading} />
          </Box>

          {dataBits.length ? (
            <Box as="section" px="2" mb="3">
              <Heading fontSize="md" mb="2">
                Data Bits
              </Heading>

              <Box d="flex" flexWrap="wrap">
                {dataBits.map((bit, bitIndex) => {
                  return (
                    <Button
                      m="1px"
                      size="xs"
                      key={bitIndex}
                      colorScheme="cyan"
                      borderRadius="none"
                    >
                      {bit}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          ) : null}
          {bitsArray.length ? (
            <Box as="section" p="3">
              <SimpleGrid columns={[1, 2]} mb="3">
                <Box mb="2">
                  <Heading size="md">Efficiency</Heading>
                  <Text>
                    Since we have some parity bits, not all of the bits can be
                    used to transfer data. Our current efficiency is:
                  </Text>
                  <Text>
                    {dataBitSize} data bits / {redundantBitsSize} ={' '}
                    <strong>{efficiency}%</strong>
                  </Text>
                </Box>
              </SimpleGrid>
              <Heading size="lg" mb="3">
                Hamming Code ({parity})
              </Heading>

              <BitsArray bitsArray={bitsArray} />
            </Box>
          ) : null}
        </SimpleGrid>
      </Box>

      <Footer />
    </ChakraProvider>
  );
}

export default App;
