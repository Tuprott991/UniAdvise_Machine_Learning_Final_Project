import { Box, Container, Flex, Text, Link, HStack, VStack } from '@chakra-ui/react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { SocialIcon } from '@components/icons';

export const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <Box as="footer" bg="#FFFFFF" boxShadow="sm">
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
              <Text fontSize="xl" fontWeight="bold" color="#1E40AF">
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
              <Text fontSize="xl" fontWeight="bold" color="#1E40AF">
                Liên hệ
              </Text>
              <HStack>
                <SocialIcon url="#" icon={Facebook} width={8} height={8} />
                <SocialIcon url="#" icon={Instagram} width={8} height={8} />
                <SocialIcon url="#" icon={Linkedin} width={8} height={8} />
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
