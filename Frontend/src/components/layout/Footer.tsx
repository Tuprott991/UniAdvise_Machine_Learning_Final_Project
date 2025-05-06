import { Box, Container, Flex, Text, Link, HStack, Icon, VStack } from '@chakra-ui/react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <Box
      as="footer"
      bg="#FFFFFF"
      color="gray.300"
      boxShadow="sm"
    >
      <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
        <VStack align="stretch" as="section">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'center', md: 'flex-start' }}
            gap={{ base: 6, md: 4 }}
          >
            <VStack align={{ base: 'center', md: 'flex-start' }}>
              <Text fontSize="xl" fontWeight="bold" color="#1E40AF">
                TuyenSinhAI
              </Text>
              <Text fontSize="sm" color="gray.400">
                © {currentYear} TuyenSinhAI. All rights reserved.
              </Text>
            </VStack>

            <VStack align={{ base: 'center', md: 'flex-end' }}>
              <Text fontSize="md" fontWeight="semibold" color="#1E40AF">
                Thông tin
              </Text>
              <Link href="#" fontSize="sm" _hover={{ color: "#1E40AF" }}>
                Điều khoản sử dụng
              </Link>
              <Link href="#" fontSize="sm" _hover={{ color: "#1E40AF" }}>
                Chính sách bảo mật
              </Link>
              <Link href="#" fontSize="sm" _hover={{ color: "#1E40AF" }}>
                Liên hệ
              </Link>
            </VStack>

            <VStack align={{ base: 'center', md: 'flex-end' }}>
              <Text fontSize="md" fontWeight="semibold" color="#1E40AF">
                Kết nối
              </Text>
              <HStack>
                <Link href="#">
                  <Icon as={Facebook} w={5} h={5} />
                </Link>
                <Link href="#">
                  <Icon as={Instagram} w={5} h={5} />
                </Link>
                <Link href="#">
                  <Icon as={Linkedin} w={5} h={5} />
                </Link>
              </HStack>
            </VStack>
          </Flex>

          <Box borderBottom="1px" borderColor="gray.700" my={4} />

          <Text fontSize="xs" color="gray.500" textAlign="center">
            Website được phát triển bởi TuyenSinhAI Team - Mang đến giải pháp tuyển sinh thông minh.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};
