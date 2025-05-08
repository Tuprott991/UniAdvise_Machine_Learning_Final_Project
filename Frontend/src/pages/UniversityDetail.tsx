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

interface UniversitySection {
  id: number;
  section: string;
  content: string;
}

export const UniversityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [sections, setSections] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('introduction');

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const res = await axios.get<UniversitySection[]>(
          `https://uniadvise-be-fastapi.onrender.com/api/uni_info/universities/${id}`
        );
        console.log(res);
        // Convert list of sections into a dictionary
        const sectionMap: Record<string, string> = {};
        res.data.forEach((item) => {
          const key = normalizeSectionKey(item.section);
          sectionMap[key] = item.content;
        });

        setSections(sectionMap);
      } catch (error) {
        console.error('Failed to fetch university:', error);
        setSections({});
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  const normalizeSectionKey = (label: string): string => {
    switch (label.trim().toLowerCase()) {
      case 'giới thiệu':
        return 'introduction';
      case 'tin tức mới nhất':
        return 'news';
      case 'mô tả':
        return 'description';
      case 'chương trình đào tạo':
        return 'programmes';
      case 'ngành học & lĩnh vực':
        return 'majors';
      case 'thông tin tuyển sinh':
        return 'admission';
      default:
        return label.toLowerCase().replace(/\s/g, '_');
    }
  };

  const tabLabels: Record<string, string> = {
    introduction: 'Giới thiệu',
    news: 'Tin tức',
    admission: 'Thông tin tuyển sinh',
    programmes: 'Chương trình đào tạo',
    majors: 'Ngành học',
  };

  if (loading) {
    return (
      <Container maxW="1200px" py={8}>
        <Spinner />
      </Container>
    );
  }

  if (!Object.keys(sections).length) {
    return (
      <Container maxW="1200px" py={8}>
        <Heading>Không tìm thấy trường đại học</Heading>
      </Container>
    );
  }

  return (
    <Box py={8}>
      <Container maxW="1200px">
        <Heading mb={6}>Thông tin chi tiết</Heading>

        <Box mb={6}>
          <Image
            src={
              'https://market.vinhomes.vn/photo/get/vhR5c-jjn4FJBiop-Gnj0AnO6yEs49QctX6focANjWFiuwsVd5TlVntAyG9uDhM0iUcuv8Setka3hlj_xh0uQBYQ==/hinh-anh-Thong-tin-truong-Dai-hoc-VinUni-Vinhomes-Ocean-Park-moi-nhat.jpg'
            }
            alt="university"
            height="400px"
            width="100%"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>

        <Flex mb={6}>
          {Object.entries(tabLabels).map(([key, label]) => (
            <Button
              key={key}
              flex="1"
              variant={activeTab === key ? 'solid' : 'ghost'}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </Button>
          ))}
        </Flex>

        <Box mt={4}>
          <Text whiteSpace="pre-line">
            {sections[activeTab] || 'Chưa có nội dung.'}
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
