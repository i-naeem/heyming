import {
  useColorMode,
  useColorModeValue,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import React from 'react';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Tooltip label={`Switch to ${text} mode`}>
      <IconButton
        fontSize="lg"
        marginLeft="2"
        color="current"
        variant="outline"
        icon={<SwitchIcon />}
        onClick={toggleColorMode}
        aria-label={`Switch to ${text} mode`}
        {...props}
      />
    </Tooltip>
  );
};
