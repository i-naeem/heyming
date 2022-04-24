import {
  Box,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  useBoolean,
} from '@chakra-ui/react';
import isPowerOf2 from '../helpers/isPowerOfTwo';
import { FaExpand } from 'react-icons/fa';
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Bit from './Bit';

const HammingCodeBits = ({
  bitsArray = [],
  parityPositions,
  parity,
  ...rest
}) => {
  const [hoveredParityBitIndex, setHoveredParityBitIndex] = useState(-1);
  const [isCompact, handler] = useBoolean(false);

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
    if (isParityBit) setHoveredParityBitIndex(bitIndex);
    return;
  };

  return (
    <Box {...rest}>
      <HStack justify="space-between">
        <Heading size="lg" mb="3">
          Hamming Code <small>({parity})</small>
        </Heading>
        <IconButton onClick={handler.toggle} icon={<FaExpand />} />
      </HStack>

      <SimpleGrid
        size="lg"
        spacing={1}
        columns={isCompact ? [6, 8, 18, 30] : [3, 4, 6, 8, 14]}
      >
        {bitsArray.map((bit, index) => {
          const bitIndex = index + 1;
          const isParityBit = isPowerOf2(bitIndex);

          return (
            <Bit
              bit={bit}
              key={bitIndex}
              bitIndex={bitIndex}
              isCompact={isCompact}
              isParityBit={isParityBit}
              onMouseLeave={() => setHoveredParityBitIndex(-1)}
              onMouseEnter={() => onMouseEnter(bitIndex, isParityBit)}
              opacity={
                hoveredParityBitIndex === -1 ||
                associatedDataBits.includes(bitIndex)
                  ? '1'
                  : '0.2'
              }
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

HammingCodeBits.propTypes = {
  bitsArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  parityPositions: PropTypes.array.isRequired,
};
export default HammingCodeBits;
