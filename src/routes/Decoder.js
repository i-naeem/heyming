import useHammingCode from '../services/HammingCode/useHammingCode';
import {
  useMediaQuery,
  AlertTitle,
  SimpleGrid,
  Heading,
  Button,
  Alert,
  Icon,
  Box,
  Text,
  Tag,
  Tooltip,
} from '@chakra-ui/react';
import HammingCodeBits from '../components/HammingCodeBits';
import { FaExclamationCircle } from 'react-icons/fa';
import UserInput from '../components/UserInput';
import MetaGrid from '../components/MetaGrid';

const Decoder = props => {
  const {
    parity,
    isError,
    dataBits,
    bitsArray,
    isLoading,
    efficiency,
    dataBitSize,
    errorIndex,
    getDataBits,
    hammingCodeSize,
    parityPositions,
    redundantBitsSize,
  } = useHammingCode();

  const [isLargerThan900] = useMediaQuery('(min-width:900px)');
  const onSubmit = (input, flag) => {
    const bits = input.split('').map(bit => parseInt(bit));
    getDataBits(bits, flag);
  };
  return (
    <Box height="100%">
      <SimpleGrid columns={1}>
        <Box p="3">
          <Heading size="lg" mb="1" align="center">
            Hamming Code Decoder{' '}
            <Tooltip label="Its not fully complete yet. Report on github if you found any bugs.">
              <Tag colorScheme="blue">Beta</Tag>
            </Tooltip>
          </Heading>
          <Text align="center">
            <strong>Hamming Code Decoder</strong> decodes the given hamming
            bits. The size of the hamming bits should be at least{' '}
            <strong>7</strong> and all the bit must be in binary format.
          </Text>

          <Text align="center">
            <em>
              It can not detect two bits array so if your input contains 2 bit
              or more than 2 bit error, the result would be unexpected.
            </em>
          </Text>
        </Box>

        <Box as="section" p="3">
          <UserInput onSubmit={onSubmit} isLoading={isLoading} minLength={7} />
        </Box>

        {isError ? (
          <Alert borderRadius="sm" status="error" mb="3">
            <Icon as={FaExclamationCircle} mr={3} color="red" />
            <AlertTitle>
              The hamming code contains an error at Bit {errorIndex}
            </AlertTitle>
          </Alert>
        ) : null}

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
                  key={bitIndex}
                  colorScheme="green"
                  borderRadius="none"
                  size={isLargerThan900 ? 'md' : 'sm'}
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
          isError={isError}
          bitsArray={bitsArray}
          errorIndex={errorIndex}
          parityPositions={parityPositions}
        />
      </SimpleGrid>
    </Box>
  );
};

export default Decoder;
