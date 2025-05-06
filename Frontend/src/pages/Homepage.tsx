import { Box, Container, Heading, Text, Button, Image, Stack, Grid } from '@chakra-ui/react';
import { School, Award, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useColorModeValue } from '../components/ui/color-mode';

export const Homepage = () => {
  const bgGradient = useColorModeValue("gray.100", "gray.800");
  
  
  return (
    <Box>
      <Box bg={bgGradient} color="black" minH="90vh" display="flex" alignItems="center">
        <Container maxW="1200px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="center">
            <Stack gap={8}>
            <Heading 
              as="h1" 
              size="3xl" 
              lineHeight="1.2"
              fontWeight="bold"
              color={useColorModeValue("blue.600", "blue.300")}
            >
              Khám phá tương lai học vấn của bạn với AI
            </Heading>
              <Text fontSize="xl" color="black" lineHeight="tall">
                Hệ thống tư vấn tuyển sinh thông minh kết hợp với AI, giúp bạn tìm ra ngôi trường 
                và ngành học phù hợp nhất với đam mê và năng lực của mình.
              </Text>
              <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
                <Link to="/chatbot" >
                <Box _hover={{ textDecoration: 'none' }}></Box>
                  <Button
                    size="lg"
                    bg="white"
                    color="blue.600"
                    _hover={{ bg: 'gray.100' }}
                    px={8}
                  >
                    Bắt đầu tư vấn
                  </Button>
                </Link>
                <Link to="/universities">
                <Box _hover={{ textDecoration: 'none' }}></Box>
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="white"
                    _hover={{ bg: 'whiteAlpha.200' }}
                    px={8}
                  >
                    Xem danh sách trường
                  </Button>
                </Link>
              </Stack>
            </Stack>
            <Box 
              position="relative" 
              display={{ base: 'none', lg: 'block' }}
            >
              <Image
                src="data:image/jpeg;base64,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"
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
              <Text fontSize="xl" color="gray.600" maxW="800px" mx="auto">
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
                  bg={useColorModeValue('white', 'gray.800')}
                  p={8}
                  borderRadius="xl"
                  boxShadow="xl"
                  border="1px"
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: '2xl',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box
                    color="blue.500"
                    bg={useColorModeValue('blue.50', 'blue.900')}
                    p={3}
                    borderRadius="lg"
                    display="inline-block"
                    mb={4}
                  >
                    {feature.icon}
                  </Box>
                  <Heading size="md" mb={4}>{feature.title}</Heading>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>
                    {feature.description}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box bg={useColorModeValue('blue.50', 'blue.900')} py={20}>
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

                <Heading size="2xl" >

                  {stat.number}
        
                </Heading>
                
                <Text fontSize="lg" fontWeight="medium" color={useColorModeValue('gray.600', 'gray.300')}>
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
            bg={useColorModeValue('white', 'gray.800')}
            p={12}
            borderRadius="2xl"
            boxShadow="2xl"
            border="1px"
            borderColor={useColorModeValue('gray.100', 'gray.700')}
            textAlign="center"
          >
            <Heading size="xl">Sẵn sàng cho tương lai của bạn?</Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')} maxW="600px" mx="auto">
              Bắt đầu hành trình tìm kiếm ngôi trường phù hợp với bạn ngay hôm nay. 
              Hoàn toàn miễn phí!
            </Text>
            <Link to="/chatbot">
            <Box _hover={{ textDecoration: 'none' }}>
              <Button
                size="lg"
                colorScheme="blue"
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