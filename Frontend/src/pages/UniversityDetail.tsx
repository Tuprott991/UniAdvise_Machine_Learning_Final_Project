import { Box, Container, Heading, Text, Image, Stack, Badge, Button, Link, Grid, GridItem } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { universities } from '../constants/universities';

export const UniversityDetail = () => {
  const { id } = useParams();
  const university = universities.find(u => u.id === id);

  if (!university) {
    return (
      <Container maxW="1200px" py={8}>
        <Heading>Không tìm thấy trường đại học</Heading>
      </Container>
    );
  }

  return (
    <Box py={8}>
      <Container maxW="1200px">
        <Image
          src={university.imageUrl}
          alt={university.name}
          height="400px"
          width="100%"
          objectFit="cover"
          borderRadius="lg"
          mb={8}
        />

        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          <GridItem>
            <Heading mb={4}>{university.name}</Heading>
            <Text fontSize="lg" mb={6}>{university.description}</Text>

            <Stack gap={4} mb={8}>
              <Heading size="md">Ngành học</Heading>
              <Stack direction="row" flexWrap="wrap" gap={2}>
                {university.majors.map(major => (
                  <Badge key={major} colorScheme="blue" fontSize="md" p={2}>
                    {major}
                  </Badge>
                ))}
              </Stack>
            </Stack>

            <Stack gap={4}>
              <Heading size="md">Thông tin chi tiết</Heading>
              <Text>Điểm chuẩn: {university.entranceScore}</Text>
              <Text>Học phí: {new Intl.NumberFormat('vi-VN').format(university.tuitionFee)}đ/năm</Text>
              <Text>Xếp hạng: {university.rating}/5</Text>
            </Stack>
          </GridItem>

          <GridItem>
            <Box bg="gray.50" p={6} borderRadius="lg">
              <Heading size="md" mb={4}>Thông tin liên hệ</Heading>
              <Stack gap={3}>
                <Text>Địa chỉ: {university.contact.address}</Text>
                <Text>Email: {university.contact.email}</Text>
                <Text>Điện thoại: {university.contact.phone}</Text>
                <Link href={university.website} target="_blank" rel="noopener noreferrer">
                  <Button colorScheme="blue" width="full" mt={4}>
                    Truy cập website
                  </Button>
                </Link>
              </Stack>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};