import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const UniversityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [university, setUniversity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('introduction');

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/uni_info/universities/${id}`);
        setUniversity(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch university:", error);
        setUniversity(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  if (loading) {
    return (
      <Container maxW="1200px" py={8}>
        <Spinner />
      </Container>
    );
  }

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
        <Heading mb={6}>{university.name}</Heading>

        <Box mb={6}>
          <Image
            src={
              university.imageUrl ||
              'https://market.vinhomes.vn/photo/get/vhR5c-jjn4FJBiop-Gnj0AnO6yEs49QctX6focANjWFiuwsVd5TlVntAyG9uDhM0iUcuv8Setka3hlj_xh0uQBYQ==/hinh-anh-Thong-tin-truong-Dai-hoc-VinUni-Vinhomes-Ocean-Park-moi-nhat.jpg'
            }
            alt={university.name}
            height="400px"
            width="100%"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>

        <Box mb={6}>
          <Flex>
            <Button flex="1" variant={activeTab === 'introduction' ? 'solid' : 'ghost'} onClick={() => setActiveTab('introduction')}>
              Giới thiệu
            </Button>
            <Button flex="1" variant={activeTab === 'news' ? 'solid' : 'ghost'} onClick={() => setActiveTab('news')}>
              Tin tức
            </Button>
            <Button flex="1" variant={activeTab === 'description' ? 'solid' : 'ghost'} onClick={() => setActiveTab('description')}>
              Mô tả
            </Button>
            <Button flex="1" variant={activeTab === 'programmes' ? 'solid' : 'ghost'} onClick={() => setActiveTab('programmes')}>
              Chương trình đào tạo
            </Button>
            <Button flex="1" variant={activeTab === 'majors' ? 'solid' : 'ghost'} onClick={() => setActiveTab('majors')}>
              Ngành học
            </Button>
          </Flex>
        </Box>

        <Box mt={4}>
          {activeTab === 'introduction' && <Text>{university.introduction || 'Chưa có nội dung.'}</Text>}
          {activeTab === 'news' && <Text>{university.news || 'Chưa có nội dung.'}</Text>}
          {activeTab === 'description' && <Text>{university.description || 'Chưa có nội dung.'}</Text>}
          {activeTab === 'programmes' && <Text>{university.programmes || 'Chưa có nội dung.'}</Text>}
          {activeTab === 'majors' && <Text>{university.majors || 'Chưa có nội dung.'}</Text>}
        </Box>
      </Container>
    </Box>
  );
};
