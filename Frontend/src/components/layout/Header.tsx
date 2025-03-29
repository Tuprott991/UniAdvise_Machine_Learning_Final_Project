import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router';
import { ColorModeButton } from '../ui/color-mode'
export const Header = () => {

  return (
    <Box as="header" py={4} px={8} bg="white" boxShadow="sm">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Flex gap={8}>
          <Link  to="/" >
            TuyenSinhAI
          </Link>
          <Link  to ="/universities">Danh sách trường</Link>
          <Link to="/chatbot">Tư vấn AI</Link>
          <Link to="/about">Về chúng tôi</Link>
        </Flex>
        <ColorModeButton />
      </Flex>
    </Box>
  );  
};