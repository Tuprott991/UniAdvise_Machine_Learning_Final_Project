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
  
  export const Register = () => {
    const [registerData, setRegisterData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (registerData.password !== registerData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Placeholder for API call
      console.log("Register data:", registerData);
      // Replace with: fetch('/api/register', { method: 'POST', body: JSON.stringify(registerData) })
    };
  
    return (
      <Box minH="100vh" bg="gray.100" py={10}>
        <Container maxW="container.sm">
          <Stack gap={8} p={6} bg="white" borderRadius="lg" boxShadow="md">
            <Heading textAlign="center">Đăng ký tài khoản</Heading>
            <form onSubmit={handleRegister}>
              <Stack gap={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="Nhập email của bạn"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Mật khẩu</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    placeholder="Nhập mật khẩu"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <Input
                    name="confirmPassword"
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder="Xác nhận mật khẩu"
                  />
                </FormControl>
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