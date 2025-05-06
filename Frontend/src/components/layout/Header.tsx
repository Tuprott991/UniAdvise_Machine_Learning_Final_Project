import { Box, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../logo/logo.png';
import { text_blue } from '../../constants/universities';
export const Header = () => {
  return (
    <Box as="header" px={4} py={2} bg="white" color="gray.800" boxShadow="sm">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo */}
        <Flex align="center" gap={4}>
          <Link to="/">
            <Image src={logo} alt="Logo" boxSize="60px" objectFit= "contain" />
          </Link>
        </Flex>

        {/* Navigation Tabs */}
        
        <Flex gap={4}>
          <Link to="/universities">
            <Box
              px={4}
              py={2}
              borderRadius="full"
              _hover={{ bg: 'gray.100' }}
              fontWeight ="bold"
              transition="background 0.2s"
              color={text_blue}
            >
              Danh sách trường
            </Box>
          </Link>
          <Link to="/chatbot">
            <Box
              px={4}
              py={2}
              borderRadius="full"
              _hover={{ bg: 'gray.100' }}
              fontWeight ="bold"
              transition="background 0.2s"
              color={text_blue}
            >
              Tư vấn AI
            </Box>
          </Link>
          <Link to="/about">
            <Box
              px={4}
              py={2}
              borderRadius="full"
              _hover={{ bg: 'gray.100' }}
              fontWeight ="bold"
              transition="background 0.2s"
              color={text_blue}
            >
              Về chúng tôi
            </Box>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
