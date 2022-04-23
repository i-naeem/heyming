import React from 'react';
import {
  Box,
  Text,
  theme,
  Button,
  Heading,
  SimpleGrid,
  ChakraProvider,
} from '@chakra-ui/react';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UserInput from './components/UserInput';
import BitsArray from './components/BitsArray';
import useHammingCode from './services/HammingCode/useHammingCode';
import isPowerOf2 from './helpers/isPowerOfTwo';

function App() {
  const {
    parity,
    bitsArray,
    isLoading,
    efficiency,
    dataBitSize,
    getHammingCode,
    hammingCodeSize,
    parityPositions,
    redundantBitsSize,
  } = useHammingCode();

  const [dataBits, setDataBits] = useState([]);
  const padLength = hammingCodeSize.toString().length;

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

          {bitsArray.length ? (
            <SimpleGrid columns={[1, 2]} mb="3" px="3">
              <Box mb="2">
                <Heading size="md" mb="sm">
                  Efficiency
                </Heading>
                <Text>
                  Since we have some parity bits, not all of the bits can be
                  used to transfer data.
                </Text>
                <Text>
                  Our current efficiency is: <strong>{dataBitSize}</strong> data
                  bits / <strong>{redundantBitsSize}</strong> parity bits ={' '}
                  <strong>{efficiency}%</strong>
                </Text>
              </Box>

              <Box>
                <Heading size="md" mb="sm">
                  Details
                </Heading>
                <SimpleGrid columns={2}>
                  <Text>Hamming Code Size</Text>
                  <Text fontWeight="bold">
                    {hammingCodeSize.toString().padStart(padLength, '0')}
                  </Text>
                  <Text>Parity Bit Size</Text>
                  <Text fontWeight="bold">
                    {redundantBitsSize.toString().padStart(padLength, '0')}
                  </Text>
                  <Text>Data Bit Size</Text>
                  <Text fontWeight="bold">
                    {dataBitSize.toString().padStart(padLength, '0')}
                  </Text>
                  <Text>Parity</Text>
                  <Text fontWeight="bold">
                    {parity.toString().padStart(padLength, '0')}
                  </Text>
                </SimpleGrid>
              </Box>
            </SimpleGrid>
          ) : null}

          {dataBits.length ? (
            <Box as="section" px="2" mb="2">
              <Heading size="md" mb="2">
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
            <Box as="section" px="3">
              <Heading size="lg" mb="2">
                Hamming Code ({parity})
              </Heading>

              {bitsArray.length < 20 ? (
                <Box d="flex" flexWrap="wrap" mb="2">
                  {bitsArray.map((bit, bitIndex) => {
                    return (
                      <Button
                        m="1px"
                        size="xs"
                        key={bitIndex}
                        colorScheme="blue"
                        borderRadius="none"
                        variant={isPowerOf2(bitIndex + 1) ? 'solid' : 'outline'}
                      >
                        {bit}
                      </Button>
                    );
                  })}
                </Box>
              ) : null}

              <BitsArray
                bitsArray={bitsArray}
                parityPositions={parityPositions}
              />
            </Box>
          ) : null}
        </SimpleGrid>
      </Box>

      <Footer />
    </ChakraProvider>
  );
}

export default App;
