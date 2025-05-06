import {
    Box,
    Container,
    Input,
    Button,
    Stack,
    Heading,
    Text, Link
  } from "@chakra-ui/react";
  import { useForm } from "react-hook-form";
  
  type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
  };
  
  export const Register = () => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<RegisterFormData>();
  
    const onSubmit = (data: RegisterFormData) => {
      if (data.password !== data.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Placeholder for API call
      console.log("Register data:", data);
      // Replace with: fetch('/api/register', { method: 'POST', body: JSON.stringify(data) })
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
                <Button type="submit" colorScheme="green" size="lg">
                  Đăng ký
                </Button>
              </Stack>
            </form>
            <Text textAlign="center" fontSize="sm">
            Đã có tài khoản?{" "}
            <Link href="/login">
              <Text as="span" color="blue.500" fontWeight="medium" _hover={{ textDecoration: "underline" }}>
                Đăng nhập
              </Text>
            </Link>
          </Text>

          </Stack>
        </Container>
      </Box>
    );
  };