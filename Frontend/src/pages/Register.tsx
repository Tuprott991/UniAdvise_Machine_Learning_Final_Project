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
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isMale?: boolean; // Boolean để biểu thị giới tính
};

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isMale, setIsMale] = useState<boolean | undefined>(undefined);
  const [genderError, setGenderError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    if (isMale === undefined) {
      setGenderError("Vui lòng chọn giới tính");
      return;
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          isMale, // Gửi giá trị boolean từ state
        }),
      });
      const result = await response.json();
      if (response.ok) {
        login(result.token); // Giả định API trả về token sau khi đăng ký
        navigate("/"); // Điều hướng về trang chủ
      } else {
        alert(result.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const password = watch("password");

  return (
    <Box minH="100vh" bg="gray.100" py={10}>
      <Container maxW="container.sm">
        <Stack gap={8} p={6} bg="white" borderRadius="lg" boxShadow="md">
          <Heading textAlign="center">Đăng ký tài khoản</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Họ và Tên <Text as="span" color="red.500">*</Text>
                </Text>
                <Input
                  {...register("fullName", {
                    required: "Họ và Tên là bắt buộc",
                    minLength: {
                      value: 2,
                      message: "Họ và Tên phải có ít nhất 2 ký tự",
                    },
                  })}
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                />
                {errors.fullName && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.fullName.message}
                  </Text>
                )}
              </Box>
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
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.password.message}
                  </Text>
                )}
              </Box>
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Xác nhận mật khẩu <Text as="span" color="red.500">*</Text>
                </Text>
                <Input
                  {...register("confirmPassword", {
                    required: "Xác nhận mật khẩu là bắt buộc",
                    validate: (value) =>
                      value === password || "Mật khẩu không khớp",
                  })}
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                />
                {errors.confirmPassword && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </Box>
              <Box>
                <Text fontWeight="medium" mb={2}>
                  Giới tính <Text as="span" color="red.500">*</Text>
                </Text>
                <Stack direction="row" gap={4}>
                  <Button
                    colorScheme={isMale === true ? "green" : "gray"}
                    variant={isMale === true ? "solid" : "outline"}
                    borderWidth={isMale === true ? "2px" : "1px"}
                    borderColor={isMale === true ? "green.600" : "gray.300"}
                    onClick={() => {
                      setIsMale(true);
                      setGenderError(null);
                    }}
                    size="sm"
                  >
                    Nam
                  </Button>
                  <Button
                    colorScheme={isMale === false ? "green" : "gray"}
                    variant={isMale === false ? "solid" : "outline"}
                    borderWidth={isMale === false ? "2px" : "1px"}
                    borderColor={isMale === false ? "green.600" : "gray.300"}
                    onClick={() => {
                      setIsMale(false);
                      setGenderError(null);
                    }}
                    size="sm"
                  >
                    Nữ
                  </Button>
                </Stack>
                {genderError && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {genderError}
                  </Text>
                )}
              </Box>
              <Button type="submit" colorScheme="green" size="lg">
                Đăng ký
              </Button>
            </Stack>
          </form>
          <Text textAlign="center" fontSize="sm">
            Đã có tài khoản?{" "}
            <Text as="span" color="blue.500">
              Đăng nhập
            </Text>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};