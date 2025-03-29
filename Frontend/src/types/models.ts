export interface University {
    id: string;
    name: string;
    location: string;
    description: string;
    imageUrl: string;
    rating: number;
    tuitionFee: number;
    entranceScore: number;
    majors: string[];
    website: string;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
  }
  
  export interface ChatMessage {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }