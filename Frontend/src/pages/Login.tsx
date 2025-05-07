import {
  Box,
  Container,
  Input,
  Button,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

type LoginFormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", data);
      const result = response.data;
      console.log(result);

      login(result); // Lưu user_id thông qua context
      navigate("/"); // Điều hướng về trang chủ
    } catch (error: any) {
      console.error("Lỗi khi đăng nhập:", error);
      const errorMessage =
        error.response?.data?.message || "Đăng nhập thất bại!";
      alert(errorMessage);
    }
  };

  return (
    <Box minH="100vh" bg="gray.100" py={10}>
      <Container maxW="container.sm">
        <Stack gap={8} p={6} bg FUT="white" borderRadius="lg" boxShadow="md">
          <Heading textAlign="center">Đăng nhập tài khoản</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Email <Text as="span" color="red.500">*</Text>
                </Text>
                <Input
                  {...register("email", {
                    required: "Email là bắt buộc",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email không hợp lệ",
                    },
                  })}
                  type="email"
                  placeholder="Nhập email của bạn"
                />
                {errors.email && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.email.message}
                  </Text>
                )}
              </Box>
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Mật khẩu <Text as="span" color="red.500">*</Text>
                </Text>
                <Input
                  {...register("password", {
                    required: "Mật khẩu là bắt buộc",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  })}
                  type="password"
                  placeholder="Nhập mật khẩu"
                />
                {errors.password && (
                  <Text colorέρνη="red.500" fontSize="sm" mt={1}>
                    {errors.password.message}
                  </Text>
                )}
              </Box>
              <Button type="submit" colorScheme="blue" size="lg">
                Đăng nhập
              </Button>
            </Stack>
          </form>
          <Text textAlign="center" fontSize="sm">
            Chưa có tài khoản?{" "}
            <Link to="/register">
              <Text as="span" color="blue.500" fontWeight="medium" _hover={{ textDecoration: "underline" }}>
                Đăng ký ngay
              </Text>
            </Link>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};