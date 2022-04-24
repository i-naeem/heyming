import useHammingCode from '../services/HammingCode/useHammingCode';
import { Heading, Button, Box, SimpleGrid } from '@chakra-ui/react';
import HammingCodeBits from '../components/HammingCodeBits';
import UserInput from '../components/UserInput';
import MetaGrid from '../components/MetaGrid';
import { useState } from 'react';

const Encoder = props => {
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
    <Box height="100%">
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
  );
};

export default Encoder;
