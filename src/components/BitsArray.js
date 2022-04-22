import { SimpleGrid, Box, Text, VStack } from '@chakra-ui/react';
import isPowerOf2 from '../helpers/isPowerOfTwo';

const BitsArray = ({ bitsArray = [] }) => {
  return (
    <SimpleGrid spacing={1} columns={[4, 6, 8, 12]} size="lg">
      {bitsArray.map((bit, index) => {
        const bitIndex = index + 1;
        const isParityBit = isPowerOf2(bitIndex);
        return (
          <Box
            p="2"
            d="flex"
            border="1px"
            key={bitIndex}
            borderColor="teal"
            justifyContent="center"
            bgColor={isParityBit ? 'teal' : 'transparent'}
          >
            <VStack spacing={0.1}>
              <Text fontSize="xl" fontWeight="bold">
                {bit}
              </Text>
              <Text>
                {isParityBit ? 'P' : 'D'}
                {bitIndex}
              </Text>
            </VStack>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default BitsArray;
