import {
  Box,
  Link,
  HStack,
  Heading,
  Container,
  IconButton,
  Button,
  useMediaQuery,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { APP_NAME } from '../configs/constants';
import { FaGithub, FaHashtag, FaQuestion } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const Header = props => {
  const [isLargerThan600] = useMediaQuery(`(min-width: 600px)`);

  const size = isLargerThan600 ? 'md' : 'xs';
  return (
    <Box>
      <Box
        p={2}
        d="flex"
        as="header"
        shadow="sm"
        height={70}
        alignItems="center"
      >
        <Container maxW="container.xl">
          <HStack justifyContent="space-between">
            <Heading
              as={Link}
              bgClip="text"
              href="/heyming"
              size={isLargerThan600 ? 'xl' : 'md'}
              bgGradient="linear(to-r, teal.500, green.500)"
            >
              {APP_NAME}
            </Heading>

            <HStack spacing={2}>
              <Button
                size={size}
                to="/heyming"
                as={RouterLink}
                leftIcon={<Icon as={FaHashtag} />}
              >
                Encoder
              </Button>
              <Button
                size={size}
                to="/decoder"
                as={RouterLink}
                leftIcon={<Icon as={FaHashtag} />}
              >
                Decoder
              </Button>
              <Tooltip label="Learn about hamming code">
                <IconButton
                  size={size}
                  to="/learn"
                  as={RouterLink}
                  fontSize="lg"
                  marginLeft="2"
                  color="current"
                  variant="outline"
                  icon={<FaQuestion />}
                  aria-label="Learn more about hamming code"
                />
              </Tooltip>

              <Tooltip label="Star the project on github">
                <IconButton
                  as="a"
                  size={size}
                  fontSize="lg"
                  marginLeft="2"
                  target="_blank"
                  color="current"
                  variant="outline"
                  icon={<FaGithub />}
                  aria-label="Link to github source"
                  href="https://github.com/i-naeem/heyming"
                />
              </Tooltip>

              <ColorModeSwitcher justifySelf="flex-end" size={size} />
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
