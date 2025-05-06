import {
    Box,
    Container,
    Input,
    Button,
    Stack,
    Heading,
    Text,
  } from "@chakra-ui/react";
  import { FormControl, FormLabel } from "@chakra-ui/form-control";
  import { useState } from "react";
  
  export const Login = () => {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
  
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLoginData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Placeholder for API call
      console.log("Login data:", loginData);
      // Replace with: fetch('/api/login', { method: 'POST', body: JSON.stringify(loginData) })
    };
  
    return (
      <Box minH="100vh" bg="gray.100" py={10}>
        <Container maxW="container.sm">
          <Stack gap={8} p={6} bg="white" borderRadius="lg" boxShadow="md">
            <Heading textAlign="center">Đăng nhập tài khoản</Heading>
            <form onSubmit={handleLogin}>
              <Stack gap={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="Nhập email của bạn"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Mật khẩu</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Nhập mật khẩu"
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" size="lg">
                  Đăng nhập
                </Button>
              </Stack>
            </form>
            <Text textAlign="center" fontSize="sm">
              Chưa có tài khoản?{" "}
              <Text as="span" color="blue.500">
                Đăng ký
              </Text>
            </Text>
          </Stack>
        </Container>
      </Box>
    );
  };