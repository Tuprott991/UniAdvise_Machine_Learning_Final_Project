import { Box, Container, Heading, Text, Stack, Grid, GridItem } from '@chakra-ui/react';

export const About = () => {
  return (
    <Box py={8}>
      <Container maxW="1200px">
        <Stack gap={8}>
          <Box textAlign="center" mb={8}>
            <Heading size="2xl" mb={4}>Về Chúng Tôi</Heading>
            <Text fontSize="xl" color="gray.600">
              Hệ thống tư vấn tuyển sinh thông minh với AI
            </Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
            <GridItem>
              <Heading size="lg" mb={4}>Sứ mệnh</Heading>
              <Text>
                Chúng tôi cam kết mang đến một nền tảng tư vấn tuyển sinh hiện đại,
                giúp các bạn học sinh và phụ huynh có được những thông tin chính xác
                và hữu ích nhất trong quá trình chọn trường đại học.
              </Text>
            </GridItem>

            <GridItem>
              <Heading size="lg" mb={4}>Tầm nhìn</Heading>
              <Text>
                Trở thành nền tảng tư vấn tuyển sinh hàng đầu Việt Nam, ứng dụng
                công nghệ AI tiên tiến để mang lại trải nghiệm tư vấn tốt nhất cho
                người dùng.
              </Text>
            </GridItem>
          </Grid>

          <Box mt={8}>
            <Heading size="lg" mb={4}>Liên hệ</Heading>
            <Stack gap={3}>
              <Text>Email: cnvt22@clc.fitus.edu.vn</Text>
              <Text>Điện thoại: 0123456789</Text>
              <Text>Địa chỉ: 227 Nguyễn Văn Cừ, Phường 4, Quận 5 , Thành phố Hồ Chí Minh , Việt Nam</Text>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};