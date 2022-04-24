import React from 'react';
import {
  Box,
  theme,
  Button,
  Heading,
  SimpleGrid,
  ChakraProvider,
} from '@chakra-ui/react';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MetaGrid from './components/MetaGrid';
import UserInput from './components/UserInput';
import HammingCodeBits from './components/HammingCodeBits';
import useHammingCode from './services/HammingCode/useHammingCode';

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

          <MetaGrid
            parity={parity}
            efficiency={efficiency}
            dataBitSize={dataBitSize}
            hammingCodeSize={hammingCodeSize}
            redundantBitsSize={redundantBitsSize}
          />

          <Box as="section" px="2" mb="3">
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

          <HammingCodeBits
            px="3"
            as="section"
            parity={parity}
            bitsArray={bitsArray}
            parityPositions={parityPositions}
          />
        </SimpleGrid>
      </Box>

      <Footer />
    </ChakraProvider>
  );
}

export default App;
