import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '@assets/logo.png';
import { text_blue } from '@styles';

export const Header = () => {
  return (
    <Box
      as="header"
      px={{ base: 4, md: 8 }}
      py={3}
      bg="white"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        gap={6}
      >
        {/* Logo */}
        <Link to="/">
          <Flex align="center" gap={3}>
            <Image src={logo} alt="Logo" boxSize="50px" objectFit="contain" />
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={text_blue}
              display={{ base: 'none', md: 'block' }}
            >
              UniGuide
            </Text>
          </Flex>
        </Link>

        {/* Navigation */}
        <Flex gap={{ base: 2, md: 4 }}>
          {[
            { to: '/universities', label: 'Danh sách trường' },
            { to: '/chatbot', label: 'Tư vấn AI' },
            { to: '/about', label: 'Về chúng tôi' },
          ].map(({ to, label }) => (
            <Link to={to} key={to}>
              <Box
                px={4}
                py={2}
                borderRadius="lg"
                fontWeight="medium"
                color={text_blue}
                transition="all 0.3s ease"
                _hover={{
                  bg: 'gray.100',
                  transform: 'translateY(-1px)',
                  boxShadow: 'md',
                }}
              >
                {label}
              </Box>
            </Link>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
