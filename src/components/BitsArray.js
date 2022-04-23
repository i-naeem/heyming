import { SimpleGrid, Box, Text, VStack } from '@chakra-ui/react';
import isPowerOf2 from '../helpers/isPowerOfTwo';
import { useState, useMemo } from 'react';

const BitsArray = ({ bitsArray = [], parityPositions }) => {
  const [hoveredParityBitIndex, setHoveredParityBitIndex] = useState(-1);

  const associatedDataBits = useMemo(() => {
    if (hoveredParityBitIndex !== -1) {
      const parityBit = parityPositions.find(
        p => p.parityIndex === hoveredParityBitIndex
      );

      const dataBitsIndexes = parityBit.associatedDataBits;

      return [...dataBitsIndexes];
    }
    return [];
  }, [hoveredParityBitIndex, parityPositions]);

  const onMouseEnter = (bitIndex, isParityBit) => {
    if (isParityBit) {
      setHoveredParityBitIndex(bitIndex);
    } else {
      return;
    }
  };

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
            onMouseLeave={() => setHoveredParityBitIndex(-1)}
            onMouseEnter={() => onMouseEnter(bitIndex, isParityBit)}
            opacity={
              hoveredParityBitIndex === -1 ||
              associatedDataBits.includes(bitIndex)
                ? '1'
                : '0.2'
            }
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
