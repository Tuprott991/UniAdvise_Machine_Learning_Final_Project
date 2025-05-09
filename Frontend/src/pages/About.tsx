/**
 * @module About
 * @description This module exports the About page component.
 * It provides information about the UniAdvise project, including its mission, vision, and contact details.
 * The component uses Chakra UI for styling and layout, and react-icons for iconography.
 */

/**
 * The `About` component renders the "About Us" page of the UniAdvise application.
 * It is a functional component that displays:
 * - A general introduction to the UniAdvise system.
 * - The mission statement of the project.
 * - The vision for the project's future.
 * - Contact information including email, phone, and address.
 *
 * The component utilizes several constants for consistent styling, such as `headingColor`,
 * `textColor`, `sectionBgColor`, and `cardBgColor`.
 *
 * @component
 * @returns {JSX.Element} The rendered About page, structured with Chakra UI components
 * like `Box`, `Container`, `Stack`, `Grid`, `Heading`, `Text`, and `Icon`.
 *
 * @example
 * // To use this component, import it and include it in your JSX:
 * import { About } from './About';
 *
 * function App() {
 *   return (
 *     <div>
 *       <About />
 *     </div>
 *   );
 * }
 */

import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Grid,
  GridItem,
  Icon,
  Flex,
} from '@chakra-ui/react';
import {
  FiTarget,
  FiEye,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart,
  FiShield,
} from 'react-icons/fi';

/**
   * @constant {string} headingColor - Defines the primary color for headings on the About page.
   * Set to a specific shade of blue ('#1E40AF').
   */
const headingColor = '#1E40AF';

/**
 * @constant {string} textColor - Defines the color for general text on the About page.
 * Set to a specific shade of gray ('gray.700').
 */
const textColor = 'gray.700';

/**
 * @constant {string} sectionBgColor - Defines the background color for the section on the About page.
 * Set to a specific shade of gray ('gray.50').
 */
const sectionBgColor = 'gray.50';

/**
 * @constant {string} cardBgColor - Defines the background color for cards on the About page.
 * Set to 'white' for a clean and modern look.
 */
const cardBgColor = 'white';

/**
 * @constant {Array} features - An array of feature objects that describe the main features of the UniAdvise system.
 * Each object contains a title, content description, and an icon.
 */
const features = [
  {
    title:
      'Sứ Mệnh',
    icon:
      FiTarget,
    content:
      'Chúng tôi cam kết mang đến một nền tảng tư vấn tuyển sinh hiện đại, minh bạch và cá nhân hóa. Sứ mệnh của chúng tôi là trang bị cho học sinh và phụ huynh những thông tin chính xác, công cụ hữu ích và sự định hướng cần thiết để đưa ra quyết định chọn trường đại học một cách tự tin và sáng suốt nhất.',
  },
  {
    title:
      'Tầm Nhìn',
    icon:
      FiEye,
    content:
      'Trở thành người bạn đồng hành đáng tin cậy và là nền tảng tư vấn tuyển sinh ứng dụng AI hàng đầu tại Việt Nam. Chúng tôi hướng đến việc kiến tạo một tương lai nơi mọi học sinh đều có thể tiếp cận nguồn thông tin chất lượng và đưa ra lựa chọn học vấn phù hợp nhất với tiềm năng của mình.',
  },
  {
    title:
      'Giá Trị Cốt Lõi',
    icon:
      FiHeart,
    content:
      'Chúng tôi đặt người học làm trung tâm, luôn đổi mới để nâng cao trải nghiệm tư vấn. Sự chính trực, tận tâm và sáng tạo là giá trị cốt lõi định hình nên cách chúng tôi phục vụ cộng đồng giáo dục.',
  },
  {
    title:
      'Cam Kết Đồng Hành',
    icon:
      FiShield,
    content:
      'Chúng tôi không chỉ là một nền tảng công nghệ, mà là người bạn đồng hành lâu dài. Luôn cập nhật thông tin, hỗ trợ nhanh chóng, đồng thời lắng nghe phản hồi để hoàn thiện dịch vụ mỗi ngày.',
  },
]

export const About = () => {
  return (
    <Box
      py={{
        base: 12,
        md: 16
      }}
      bg={sectionBgColor}
      userSelect="none"
    >
      <Container
        maxW="container.xl"
      >
        <Stack gap={{ base: 10, md: 16 }}>
          {/* Giới thiệu */}
          <Box textAlign="center">
            <Heading as="h1" size="3xl" mb={4} color={headingColor}>
              Về Chúng Tôi
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={textColor}
              maxW="2xl"
              mx="auto"
            >
              Hệ thống tư vấn tuyển sinh thông minh ứng dụng Trí Tuệ Nhân Tạo (AI)
              để đồng hành cùng bạn trên hành trình chọn trường đại học.
            </Text>
          </Box>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={{ base: 8, md: 12 }}
            alignItems="stretch"
          >
            {features.map((item, index) => (
              <GridItem
                key={index}
                bg={cardBgColor}
                p={{ base: 6, md: 8 }}
                borderRadius="xl"
                boxShadow="lg"
                transition="all 0.3s ease-in-out"
                _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
                height="100%"
              >
                <Flex align="center" mb={5}>
                  <Icon as={item.icon} w={10} h={10} color={headingColor} mr={4} />
                  <Heading size="xl" color={headingColor}>
                    {item.title}
                  </Heading>
                </Flex>
                <Text fontSize="md" color={textColor} textAlign="justify">
                  {item.content}
                </Text>
              </GridItem>
            ))}
          </Grid>

          {/* Liên hệ */}
          <Box textAlign="center" pt={{ base: 8, md: 12 }} mt={{ base: 8, md: 12 }}>
            <Heading size="2xl" mb={8} color={headingColor}>
              Kết Nối Với Chúng Tôi
            </Heading>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
              gap={{ base: 6, md: 8 }}
              alignItems="stretch"
            >
              <Stack
                height="100%" // quan trọng
                gap={4}
                align="center"
                p={6}
                bg={cardBgColor}
                borderRadius="md"
                boxShadow="md"
              >
                <Icon as={FiMail} w={8} h={8} color={headingColor} />
                <Heading size="md" color={textColor}>
                  Email
                </Heading>
                <Text
                  fontSize="md"
                  color={textColor}
                  _hover={{ color: headingColor, textDecoration: 'underline' }}
                  cursor="pointer"
                >
                  cnvt22@clc.fitus.edu.vn
                </Text>
              </Stack>

              <Stack
                height="100%"
                gap={4}
                align="center"
                p={6}
                bg={cardBgColor}
                borderRadius="md"
                boxShadow="md"
              >
                <Icon as={FiPhone} w={8} h={8} color={headingColor} />
                <Heading size="md" color={textColor}>
                  Điện thoại
                </Heading>
                <Text
                  fontSize="md"
                  color={textColor}
                  _hover={{ color: headingColor }}
                  cursor="pointer"
                >
                  0123 456 789
                </Text>
              </Stack>

              <Stack
                height="100%"
                gap={4}
                align="center"
                p={6}
                bg={cardBgColor}
                borderRadius="md"
                boxShadow="md"
              >
                <Icon as={FiMapPin} w={8} h={8} color={headingColor} />
                <Heading size="md" color={textColor}>
                  Địa chỉ
                </Heading>
                <Text fontSize="md" color={textColor}>
                  227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh, Việt Nam
                </Text>
              </Stack>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
