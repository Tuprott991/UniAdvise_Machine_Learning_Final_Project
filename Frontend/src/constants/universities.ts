import { University } from '../types/models'

export const universities: University[] = [
  {
    id: '1',
    name: 'Đại học Quốc gia Hà Nội',
    location: 'Hà Nội',
    description: 'Một trong những trường đại học hàng đầu Việt Nam với lịch sử lâu đời và chất lượng đào tạo xuất sắc.',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    tuitionFee: 25000000,
    entranceScore: 25,
    majors: ['Công nghệ thông tin', 'Kinh tế', 'Luật', 'Y khoa'],
    website: 'https://vnu.edu.vn',
    contact: {
      email: 'info@vnu.edu.vn',
      phone: '024 3754 7461',
      address: '144 Xuân Thủy, Cầu Giấy, Hà Nội'
    }
  },
  {
    id: '2',
    name: 'Đại học Bách khoa Hà Nội',
    location: 'Hà Nội',
    description: 'Trường đại học kỹ thuật hàng đầu với nhiều chương trình đào tạo chất lượng cao.',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    tuitionFee: 30000000,
    entranceScore: 26,
    majors: ['Kỹ thuật điện tử', 'Cơ khí', 'Công nghệ thông tin', 'Tự động hóa'],
    website: 'https://hust.edu.vn',
    contact: {
      email: 'info@hust.edu.vn',
      phone: '024 3869 2222',
      address: 'Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội'
    }
  }
];