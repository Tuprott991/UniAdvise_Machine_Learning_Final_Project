import { Box, Image, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { University } from '../../types/models';

interface UniversityCardProps {
  university: University;
}

export const UniversityCard = ({ university }: UniversityCardProps) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src="https://market.vinhomes.vn/photo/get/vhR5c-jjn4FJBiop-Gnj0AnO6yEs49QctX6focANjWFiuwsVd5TlVntAyG9uDhM0iUcuv8Setka3hlj_xh0uQBYQ==/hinh-anh-Thong-tin-truong-Dai-hoc-VinUni-Vinhomes-Ocean-Park-moi-nhat.jpg" alt={university.name} height="200px" width="100%" objectFit="cover" />
      <Box p={6}>
        <Heading size="md" mb={2}>{university.name}</Heading>
        <Text color="gray.600" mb={4} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {university.description}
        </Text>

        <Link to={`/university/${university.id}`} >
          <Button colorScheme="blue" width="full">
            Xem chi tiết
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
