import { Box, Container, VStack, Text, Link, HStack } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box as="footer" bg="gray.50" color="gray.700" py={10}>
      <Container maxW="1200px">
        <VStack gap={4} align="center">
          <Text>© 2024 TuyenSinhAI. All rights reserved.</Text>
          <HStack gap={6}>
            <Link href="#">Điều khoản sử dụng</Link>
            <Link href="#">Chính sách bảo mật</Link>
            <Link href="#">Liên hệ</Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};
