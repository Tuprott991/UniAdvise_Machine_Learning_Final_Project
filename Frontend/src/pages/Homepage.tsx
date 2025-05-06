import { Box, Container, Heading, Text, Button, Image, Stack, Grid } from '@chakra-ui/react';
import { School, Award, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { text_blue } from '@styles';

export const Homepage = () => {
  return (
    <Box>
      <Box bg="gray.100" color="black" minH="90vh" display="flex" alignItems="center">
        <Container maxW="1200px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="center">
            <Stack gap={8}>
              <Heading 
                as="h1" 
                size="3xl" 
                lineHeight="1.2"
                fontWeight="bold"
                color={text_blue}
              >
                Khám phá tương lai học vấn của bạn với AI
              </Heading>
              <Text fontSize="xl" color="black" lineHeight="tall">
                Hệ thống tư vấn tuyển sinh thông minh kết hợp với AI, giúp bạn tìm ra ngôi trường 
                và ngành học phù hợp nhất với đam mê và năng lực của mình.
              </Text>
              <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
                <Link to="/chatbot">
                  <Box _hover={{ textDecoration: 'none' }}>
                    <Button
                      size="lg"
                      bg="white"
                      color={text_blue}
                      _hover={{ bg: 'gray.100' }}
                      px={8}
                    >
                      Bắt đầu tư vấn
                    </Button>
                  </Box>
                </Link>
                <Link to="/universities">
                  <Box _hover={{ textDecoration: 'none' }}>
                    <Button
                      size="lg"
                      variant="outline"
                      borderColor="white"
                      bg = "white"
                      color={text_blue}
                      _hover={{ bg: 'gray.100' }}
                      px={8}
                    >
                      Xem danh sách trường
                    </Button>
                  </Box>
                </Link>
              </Stack>
            </Stack>
            <Box 
              position="relative" 
              display={{ base: 'none', lg: 'block' }}
            >
              <Image
                src="./tuktu.jpg"
                alt="Students studying"
                borderRadius="2xl"
                boxShadow="2xl"
                width="100%"
                height="500px"
                objectFit="cover"
              />
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20}>
        <Container maxW="1200px">
          <Stack gap={16}>
            <Stack gap={4} textAlign="center">
              <Heading size="2xl">Tại sao chọn TuyenSinhAI?</Heading>
              <Text fontSize="xl" color={text_blue} maxW="800px" mx="auto">
                Chúng tôi kết hợp công nghệ AI tiên tiến với dữ liệu giáo dục toàn diện để mang đến 
                trải nghiệm tư vấn tuyển sinh tốt nhất cho bạn
              </Text>
            </Stack>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
              {[
                {
                  icon: <Brain size={32} />,
                  title: 'AI Thông Minh',
                  description: 'Sử dụng công nghệ AI tiên tiến để phân tích và đưa ra gợi ý phù hợp nhất'
                },
                {
                  icon: <School size={32} />,
                  title: 'Dữ Liệu Toàn Diện',
                  description: 'Thông tin chi tiết về hơn 100 trường đại học và cao đẳng trên cả nước'
                },
                {
                  icon: <Award size={32} />,
                  title: 'Tư Vấn Chuyên Sâu',
                  description: 'Phân tích điểm số, sở thích và định hướng nghề nghiệp của bạn'
                }
              ].map((feature, index) => (
                <Box
                  key={index}
                  bg="white"
                  p={8}
                  borderRadius="xl"
                  boxShadow="xl"
                  border="1px"
                  borderColor="gray.100"
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: '2xl',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box
                    color={text_blue}
                    bg="blue.50"
                    p={3}
                    borderRadius="lg"
                    display="inline-block"
                    mb={4}
                  >
                    {feature.icon}
                  </Box>
                  <Heading size="md" mb={4}>{feature.title}</Heading>
                  <Text color="gray.600">
                    {feature.description}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box bg="blue.50" py={20}>
        <Container maxW="1200px">
          <Grid 
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} 
            gap={8}
            textAlign="center"
          >
            {[
              { number: '100+', label: 'Trường Đại học' },
              { number: '300+', label: 'Ngành học' },
              { number: '50K+', label: 'Học sinh tư vấn' },
              { number: '95%', label: 'Độ hài lòng' }
            ].map((stat, index) => (
              <Stack key={index} gap={2}>
                <Heading size="2xl">
                  {stat.number}
                </Heading>
                <Text fontSize="lg" fontWeight="medium" color="gray.600">
                  {stat.label}
                </Text>
              </Stack>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20}>
        <Container maxW="900px">
          <Stack 
            gap={8} 
            bg="white"
            p={12}
            borderRadius="2xl"
            boxShadow="2xl"
            border="1px"
            borderColor="gray.100"
            textAlign="center"
          >
            <Heading color = {text_blue} size="xl">Sẵn sàng cho tương lai của bạn?</Heading>
            <Text fontSize="lg" color="gray.600" maxW="600px" mx="auto">
              Bắt đầu hành trình tìm kiếm ngôi trường phù hợp với bạn ngay hôm nay. 
              Hoàn toàn miễn phí!
            </Text>
            <Link to="/chatbot">
              <Box _hover={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  colorScheme={text_blue}
                  px={8}
                  maxW="400px"
                  mx="auto"
                >
                  Bắt đầu tư vấn miễn phí
                </Button>
              </Box>
            </Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};