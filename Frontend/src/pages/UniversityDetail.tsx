import { Box, Container, Heading, Text, Image, Button, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { universities } from '../constants/universities';

export const UniversityDetail = () => {
  const { id } = useParams();
  const university = universities.find((u) => u.id === id);

  const [activeTab, setActiveTab] = useState('introduction'); // Trạng thái để theo dõi tab hiện tại

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

        {/* Image container */}
        <Box mb={6}>
          <Image
            src={university.imageUrl}
            alt={university.name}
            height="400px"
            width="100%"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>

        {/* Tabs Container */}
        <Box mb={6}>
          <Flex>
            {/* Các Button sẽ thay đổi activeTab khi click */}
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

        {/* Nội dung hiển thị theo tab hiện tại */}
        <Box mt={4}>
          {activeTab === 'introduction' && <Text>{university.introduction}</Text>}
          {activeTab === 'news' && <Text>{university.news}</Text>}
          {activeTab === 'description' && <Text>{university.description}</Text>}
          {activeTab === 'programmes' && <Text>{university.programmes}</Text>}
          {activeTab === 'majors' && <Text>{university.majors}</Text>}
        </Box>
      </Container>
    </Box>
  );
};
