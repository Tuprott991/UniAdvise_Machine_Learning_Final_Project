export interface University {
    id: string;
    name: string;
    introduction: string;
    news: string;
    description: string;
    programmes: string;
    majors: string;
    imageUrl: string;
  }
  
  export interface ChatMessage {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }