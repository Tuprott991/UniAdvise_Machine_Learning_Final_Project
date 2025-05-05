import { Box, Image, Heading, Text, Badge, Stack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { University } from '../../types/models';

interface UniversityCardProps {
  university: University;
}

export const UniversityCard = ({ university }: UniversityCardProps) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={university.imageUrl} alt={university.name} height="200px" width="100%" objectFit="cover" />
      <Box p={6}>
        <Heading size="md" mb={2}>{university.name}</Heading>
        <Text color="gray.600" mb={4} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {university.description}
        </Text>
        <Stack direction="row" mb={4}>
          <Badge colorScheme="blue">Điểm chuẩn: {university.entranceScore}</Badge>
          <Badge colorScheme="green">
            {new Intl.NumberFormat('vi-VN').format(university.tuitionFee)}đ/năm
          </Badge>
          <Badge colorScheme = "red"> Đánh giá: {university.rating}</Badge>
        </Stack>
        <Link to={`/university/${university.id}`} >
          <Button colorScheme="blue" width="full">
            Xem chi tiết
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
