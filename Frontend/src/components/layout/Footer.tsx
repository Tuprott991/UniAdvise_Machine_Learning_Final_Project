import { Box, Container, Flex, Text, Link, HStack, VStack } from '@chakra-ui/react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { SocialIcon } from '@components/icons';

/**
 * Footer component dùng để hiển thị phần chân trang của website.
 * Bao gồm tên thương hiệu, thông tin pháp lý, điều hướng thông tin và liên kết mạng xã hội.
 *
 * @component
 * @returns {JSX.Element} JSX của phần footer
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export const Footer: React.FC = () => {
  /**
   * Lấy năm hiện tại để hiển thị trong dòng bản quyền.
   */
  const currentYear: number = new Date().getFullYear();

  return (
    <Box
      as="footer"
      bg="#FFFFFF"
      boxShadow="sm"
      userSelect={"none"}
    >
      <Container
        maxW="container.xl"
        py={{ base: 6, md: 10 }}
      >
        <VStack
          align="stretch"
          as="section"
        >
          {/* Phần chính của footer chia làm 3 cột: thương hiệu, thông tin, liên hệ */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'center', md: 'flex-start' }}
            gap={{ base: 6, md: 4 }}
          >
            {/* Cột: Thương hiệu */}
            <VStack align={{ base: 'center', md: 'flex-start' }}>
              <Text fontSize="xl" fontWeight="bold" color="#1E40AF">
                TuyenSinhAI
              </Text>
              <Text fontSize="sm" color="gray.400">
                © {currentYear} TuyenSinhAI. All rights reserved.
              </Text>
            </VStack>

            {/* Cột: Liên kết thông tin */}
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

            {/* Cột: Mạng xã hội */}
            <VStack align={{ base: 'center', md: 'flex-end' }}>
              <Text fontSize="xl" fontWeight="bold" color="#1E40AF">
                Liên hệ
              </Text>
              <HStack>
                <SocialIcon url="https://www.facebook.com/ktu.tu.75" icon={Facebook} width={8} height={8} />
                <SocialIcon url="https://www.instagram.com/ktu.tu" icon={Instagram} width={8} height={8} />
                <SocialIcon url="#" icon={Linkedin} width={8} height={8} />
              </HStack>
            </VStack>
          </Flex>

          {/* Đường gạch ngăn cách */}
          <Box borderBottom="1px" borderColor="gray.700" my={4} />

          {/* Dòng mô tả ngắn gọn */}
          <Text fontSize="xs" color="gray.500" textAlign="center">
            Website được phát triển bởi TuyenSinhAI Team - Mang đến giải pháp tuyển sinh thông minh.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};
