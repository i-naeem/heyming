import {
  Box,
  Text,
  Heading,
  ListItem,
  Container,
  UnorderedList,
  Link,
} from '@chakra-ui/react';
import { APP_NAME } from '../configs/constants';

const Article = props => <Box as="article" {...props} mb="5" />;

const Home = props => {
  return (
    <Box height="100%">
      <Container maxW="container.xl">
        <Article>
          <Heading as="h1" mb="1" size="lg">
            What is {APP_NAME}
          </Heading>
          <Text as="p" mb="2">
            {APP_NAME} is a hamming code encoder and decoder. It can encode data
            bits to hamming code. It also decodes hamming code and check for
            single bit errors.
          </Text>

          <Heading as="h2" size="md">
            Features
          </Heading>
          <UnorderedList px="3">
            <ListItem>Encodes Data Bits</ListItem>
            <ListItem>Decodes Hamming Code</ListItem>
            <ListItem>Detect Single Bit Error</ListItem>
          </UnorderedList>
        </Article>

        <Article>
          <Heading as="h1" mb="1" size="lg">
            What is hamming code?
          </Heading>
          <Text as="p" mb="2">
            Computers represent data digitally as 1s and 0s, called 'bits'.
            Sometimes these bits are mistakenly swapped, for example: a
            scratched CD or a message garbled in transit between computers.
            Invented in 1950 by <mark>Richard Hamming</mark>, Hamming Code can
            correct 1-bit errors and detect 2-bit errors, making data transfer
            and saving more robust.
          </Text>

          <Text as="p" mb="2">
            A <mark>parity bit</mark> is a single bit that tracks whether the
            number of 1's is odd or even. If the number of 1's is odd, the
            parity bit is 1; if the number of 1's is even, the parity bit is 0.
            Hamming cleverly arranged each parity bit to track different halves
            of the data, so that we can correct 1-bit errors and, with an extra
            step, detect 2-bit errors.
          </Text>

          <Heading as="h2" size="md">
            How to arrange parity bits?
          </Heading>
          <Text as="p" mb="2">
            In everyday base-10 counting, powers-of-10 (1, 10, 100, etc...) are
            written with 0s and a single 1. Similarly, in binary, powers-of-2
            (1, 2, 4, 8, 16, etc...) are written with 0s and a single 1 (0001,
            0010, 0100, 1000, etc...). In a message, the bits in a powers-of-2
            position will be our parity bits. These parity bits track the parity
            of the other bits in the message whose position have a 1 in the same
            place. If one of bits is flipped, the parity will be wrong. If you
            select a data length that makes a square, you can visually see that
            each parity bit tracks certain rows and columns, splitting the
            message in halves to efficiently locate where the error is, like a
            game of "20 questions" or like a binary search. After calculating
            what the parity bits should equal, the parity bits point to the
            location of the error!
          </Text>
        </Article>

        <Article>
          <Heading size="lg">Efficiency and Limitations</Heading>
          <Text as="p" mb="2">
            Of course, by having some parity bits, not all bits can be used to
            transmit data. In this case, we need 05 parity bits to track 12 bits
            of data for an overall efficiency of 70.59%. Longer messages loosely
            correlate with higher efficiency. The longer the message, however,
            the more likely the chance of bit errors, rendering Hamming Code
            insufficient, since it cannot detect 3 or more errors.
          </Text>

          <Heading size="md" mb="1">
            From Wikiepdia:
          </Heading>
          <Text as="i" mb="2">
            "If the decoder does not attempt to correct errors, it can reliably
            detect triple bit errors. If the decoder does correct errors, some
            triple errors will be mistaken for single errors and "corrected" to
            the wrong value. Error correction is therefore a trade-off between
            certainty (the ability to reliably detect triple bit errors) and
            resiliency (the ability to keep functioning in the face of single
            bit errors)."
          </Text>
        </Article>

        <Article>
          <Heading as="h1" size="md" mb="1">
            Resources
          </Heading>

          <Text as="p">
            Read more about Hamming Code:{' '}
            <Link
              color="blue.500"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Hamming_code"
            >
              https://en.wikipedia.org/wiki/Hamming_code
            </Link>
          </Text>
          <Text as="p">
            Read more about error-correcting code:{' '}
            <Link
              color="blue.500"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Linear_code"
            >
              https://en.wikipedia.org/wiki/Linear_code
            </Link>
          </Text>
          <Text>
            Learn hamming code from a video:{' '}
            <Link
              color="blue.500"
              target="_blank"
              href="https://www.3blue1brown.com/lessons/hamming-codes"
            >
              3Blue1Brown Hamming Code Explanation
            </Link>
          </Text>
        </Article>
      </Container>
    </Box>
  );
};

export default Home;
