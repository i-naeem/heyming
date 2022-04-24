import {
  Box,
  Text,
  HStack,
  Heading,
  IconButton,
  SimpleGrid,
  useBoolean,
  ButtonGroup,
  useMediaQuery,
  useOutsideClick,
} from '@chakra-ui/react';
import { FaCompress, FaExpand } from 'react-icons/fa';
import isPowerOf2 from '../helpers/isPowerOfTwo';
import { useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import Bit from './Bit';

const HammingCodeBits = ({
  bitsArray = [],
  parityPositions,
  errorIndex,
  isError,
  parity,
  ...rest
}) => {
  const [activeParityBit, setActiveParityBit] = useState(-1);
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');
  const [isCompact, handler] = useBoolean(false);
  const ref = useRef();

  useOutsideClick({ ref, handler: () => setActiveParityBit(-1) });

  // Get the associated data bits of activeParity bit
  const associatedDataBits = useMemo(() => {
    if (activeParityBit !== -1) {
      const parityBit = parityPositions.find(
        p => p.parityIndex === activeParityBit
      );

      const dataBitsIndexes = parityBit.associatedDataBits;

      return [...dataBitsIndexes];
    }
    return [];
  }, [activeParityBit, parityPositions]);

  const handleBitClick = (bitIndex, isParityBit) => {
    if (activeParityBit === bitIndex) setActiveParityBit(-1);
    else if (isParityBit) setActiveParityBit(bitIndex);
    else setActiveParityBit(-1);
  };

  return (
    <Box {...rest} ref={ref}>
      <Box mb="3">
        <HStack justify="space-between" align="center">
          <Heading size={isLargerThan900 ? 'lg' : 'md'}>
            Hamming Code <small>({parity})</small>
          </Heading>

          <ButtonGroup size={isLargerThan900 ? 'sm' : 'xs'} colorScheme="blue">
            <IconButton
              shadow="none"
              icon={<FaExpand />}
              onClick={handler.off}
              aria-label="Expand the bits"
              variant={isCompact ? 'ghost' : 'solid'}
            />
            <IconButton
              shadow="none"
              onClick={handler.on}
              icon={<FaCompress />}
              aria-label="Compact the bits"
              variant={isCompact ? 'solid' : 'ghost'}
            />
          </ButtonGroup>
        </HStack>
        <Text>Try clicking over the parity bits</Text>
      </Box>

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
              errorIndex={errorIndex}
              onClick={() => handleBitClick(bitIndex, isParityBit)}
              opacity={
                activeParityBit === -1 || associatedDataBits.includes(bitIndex)
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
  errorIndex: PropTypes.number,
  isError: PropTypes.bool,
};

export default HammingCodeBits;
