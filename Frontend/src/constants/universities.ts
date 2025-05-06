import { University } from '../types/models';

export const universities: University[] = [
  {
    id: '1',
    name: 'Đại học Quốc gia Hà Nội',
    introduction: 'Một trong những trường đại học trọng điểm quốc gia, có hệ thống đào tạo đa ngành.',
    news: 'ĐH Quốc gia Hà Nội vừa công bố điểm chuẩn năm 2025 với nhiều ngành tăng mạnh.',
    description: 'Trường có lịch sử lâu đời và là một trong những trung tâm nghiên cứu hàng đầu Việt Nam.',
    programmes: 'Đào tạo đại học, sau đại học, chương trình liên kết quốc tế.',
    majors: 'Công nghệ thông tin, Kinh tế, Luật, Y khoa',
    imageUrl: 'https://example.com/university1.jpg'
  },
  {
    id: '2',
    name: 'Đại học Bách khoa Hà Nội',
    introduction: 'Trường đại học kỹ thuật hàng đầu Việt Nam với nhiều chương trình kỹ sư chất lượng cao.',
    news: 'Đại học Bách khoa Hà Nội triển khai chương trình đào tạo tích hợp thạc sĩ – kỹ sư.',
    description: 'Trường nổi tiếng với thế mạnh về kỹ thuật, công nghệ và nghiên cứu ứng dụng.',
    programmes: 'Chương trình kỹ sư 5 năm, đào tạo thạc sĩ, tiến sĩ, liên kết quốc tế.',
    majors: 'Kỹ thuật điện tử, Cơ khí, Công nghệ thông tin, Tự động hóa',
    imageUrl: 'https://example.com/university1.jpg'
  }
];
