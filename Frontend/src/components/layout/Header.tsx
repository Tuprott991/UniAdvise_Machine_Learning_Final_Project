import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "@assets/logo.png";
import { text_blue } from "@styles/";
import { useAuth } from "@context/AuthContext";

/**
 * `Header` component đại diện cho phần đầu trang (navbar) của ứng dụng.
 * Bao gồm logo, điều hướng chính, và các nút xác thực người dùng (Đăng nhập/Đăng ký/Đăng xuất).
 *
 * @component
 * @returns {JSX.Element} JSX hiển thị phần header cố định phía trên
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 */
export const Header = () => {
  /**
   * Lấy trạng thái xác thực và hàm logout từ AuthContext
   */
  const { isAuthenticated, logout } = useAuth();

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
      userSelect={"none"}
    >
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        gap={6}
      >
        {/* Logo và tên thương hiệu */}
        <Link to="/">
          <Flex align="center" gap={3}>
            <Image
              src={logo}
              alt="Logo"
              boxSize="50px"
              objectFit="contain"
            />
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={text_blue}
              display={{ base: "none", md: "block" }}
            >
              TuyenSinhAI
            </Text>
          </Flex>
        </Link>

        {/* Thanh điều hướng chính */}
        <Flex gap={{ base: 2, md: 4 }}>
          {[
            { to: "/universities", label: "Danh sách trường" },
            { to: "/chatbot", label: "Tư vấn AI" },
            { to: "/roadmap", label: "Lộ trình học tập" },
            { to: "/about", label: "Về chúng tôi" },
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
                  bg: "gray.100",
                  transform: "translateY(-1px)",
                  boxShadow: "md",
                }}
              >
                {label}
              </Box>
            </Link>
          ))}
        </Flex>

        {/* Hiển thị nút tuỳ theo trạng thái xác thực */}
        <Flex gap={2}>
          {isAuthenticated ? (
            // Nếu đã đăng nhập: hiển thị nút đăng xuất
            <Button
              variant="outline"
              color={text_blue}
              borderColor={text_blue}
              _hover={{ bg: "gray.100" }}
              size="sm"
              onClick={logout}
            >
              Đăng xuất
            </Button>
          ) : (
            // Nếu chưa đăng nhập: hiển thị nút đăng nhập và đăng ký
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  color={text_blue}
                  borderColor={text_blue}
                  _hover={{ bg: "gray.100" }}
                  size="sm"
                >
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  colorScheme={text_blue}
                  size="sm"
                  _hover={{ bg: `${text_blue}.600` }}
                >
                  Đăng ký
                </Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
