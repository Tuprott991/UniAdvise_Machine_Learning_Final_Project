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
  import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/tabs";
  import { useState } from "react";
  
  export const Auth = () => {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
    });
    const [tabIndex, setTabIndex] = useState(0);
  
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLoginData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Placeholder for API call
      console.log("Login data:", loginData);
      // Replace with: fetch('/api/login', { method: 'POST', body: JSON.stringify(loginData) })
    };
  
    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (registerData.password !== registerData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Placeholder for API call
      console.log("Register data:", registerData);
    };
  
    return (
      <Box minH="100vh" bg="gray.100" py={10}>
        <Container maxW="container.sm">
          <Stack gap={8} p={6} bg="white" borderRadius="lg" boxShadow="md">
            <Heading textAlign="center">Chào mừng bạn</Heading>
            <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
              <TabList>
                <Tab>Đăng nhập</Tab>
                <Tab>Đăng ký</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
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
                </TabPanel>
                <TabPanel>
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
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Text textAlign="center" fontSize="sm">
              Quên mật khẩu? <Text as="span" color="blue.500">Khôi phục</Text>
            </Text>
          </Stack>
        </Container>
      </Box>
    );
  };