import {
  Box,
  ButtonGroup,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  useBoolean,
  useMediaQuery,
} from '@chakra-ui/react';
import isPowerOf2 from '../helpers/isPowerOfTwo';
import { FaCompress, FaExpand } from 'react-icons/fa';
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
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');
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
      <HStack justify="space-between" mb="2" align="center">
        <Heading size={isLargerThan900 ? 'lg' : 'md'}>
          Hamming Code <small>({parity})</small>
        </Heading>

        <ButtonGroup size={isLargerThan900 ? 'sm' : 'xs'} colorScheme="blue">
          <IconButton
            shadow="none"
            variant={isCompact ? 'ghost' : 'solid'}
            onClick={handler.off}
            icon={<FaExpand />}
          />
          <IconButton
            shadow="none"
            onClick={handler.on}
            variant={isCompact ? 'solid' : 'ghost'}
            icon={<FaCompress />}
          />
        </ButtonGroup>
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
