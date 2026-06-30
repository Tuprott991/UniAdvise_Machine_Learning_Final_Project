import { Box, Image, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { University } from '../../types/models';
import universityImages from '../../data/university_og_images.json';

interface UniversityCardProps {
  university: University;
}

const DEFAULT_IMAGE =
  'https://market.vinhomes.vn/photo/get/vhR5c-jjn4FJBiop-Gnj0AnO6yEs49QctX6focANjWFiuwsVd5TlVntAyG9uDhM0iUcuv8Setka3hlj_xh0uQBYQ==/hinh-anh-Thong-tin-truong-Dai-hoc-VinUni-Vinhomes-Ocean-Park-moi-nhat.jpg';

type UniversityImage = {
  name: string | null;
  image: string;
};

const normalizeName = (name: string) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const imageByName = new Map(
  (universityImages as UniversityImage[])
    .filter((item) => item.name && item.image)
    .map((item) => [normalizeName(item.name as string), item.image])
);

export const UniversityCard = ({ university }: UniversityCardProps) => {
  const imageSrc =
    university.imageUrl || imageByName.get(normalizeName(university.name)) || DEFAULT_IMAGE;

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={imageSrc} alt={university.name} height="200px" width="100%" objectFit="cover" />
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
