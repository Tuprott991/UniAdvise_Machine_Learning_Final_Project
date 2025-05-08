import {
  Box,
  Container,
  VStack,
  Input,
  Button,
  Text,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ChatMessage } from '../types/models';

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
}

// Tạo instance của axios với cấu hình mặc định
const api = axios.create({
  baseURL: 'https://uniadvise-be-fastapi.onrender.com/api/chatbot',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để gắn user_id vào header Authorization nếu cần
api.interceptors.request.use((config) => {
  const user_id = localStorage.getItem('user_id');
  if (user_id) {
    config.headers.Authorization = `Bearer ${user_id}`;
  }
  return config;
});

export const Chatbot = () => {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Xin chào! Tôi có thể giúp gì cho bạn về tuyển sinh đại học?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatSession[]>([]);

  // Lấy user_id từ localStorage
  const user_id = parseInt(localStorage.getItem('user_id') || '0', 10); // Chuyển thành số nguyên

  // Lấy danh sách thread từ API
  const fetchChatHistory = useCallback(async () => {
    try {
      const res = await api.get(`/chat/all_history/${user_id}`);
      console.log('Chat history:', res.data.threads);
      // res.data.threads là một mảng các thread id

      const threads = res.data.threads.map((thread: string) => ({
        id: thread,
        title: `Cuộc trò chuyện ${thread}`, // Tạo tiêu đề mặc định dựa trên thread_id
        messages: [], // Sẽ được tải khi chọn session
      }));
  
      setHistory(threads.sort((a: ChatSession, b: ChatSession) => Number(b.id) - Number(a.id)));
      return threads;
    } catch (err) {
      console.error('Error fetching chat history:', err);
      setError('Không thể tải lịch sử trò chuyện.');
      setHistory([]);
      return [];
    }
  }, [user_id]);

  // Lấy lịch sử tin nhắn của một thread
  const fetchSessionMessages = useCallback(async (thread_id: string) => {
    try {
      const res = await api.get(`/chat/history/${thread_id}`, {
        params: { user_id },
      });
  
      const formattedHistory = res.data.history;
  
      // Chuyển đổi formattedHistory thành ChatMessage[]
      const sessionMessages: ChatMessage[] = formattedHistory.map((msg: any, index: number) => ({
        id: `${thread_id}-${index}`,
        content: msg.content,
        sender: msg.role === 'human' ? 'user' : 'bot', // Đồng bộ giá trị sender
        timestamp: new Date(msg.timestamp || Date.now()),
      }));
  
      return sessionMessages;
    } catch (err) {
      console.error('Error fetching session messages:', err);
      setError('Không thể tải tin nhắn của cuộc trò chuyện.');
      return [];
    }
  }, [user_id]);

  // Tải lịch sử khi component mount
  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  const handleNewChat = async () => {
    try {
      const res = await api.post('/chat/create', { user_id: user_id.toString() });
      const newSessionId = res.data.thread_id;
      console.log('New session created with ID:', newSessionId);

      // Tạo cuộc trò chuyện mới
      const newMessages: ChatMessage[] = [
        {
          id: Date.now().toString(),
          content: 'Xin chào! Tôi có thể giúp gì cho bạn về tuyển sinh đại học?',
          sender: 'bot',
          timestamp: new Date(),
        },
      ];
      setMessages(newMessages);
      setCurrentSessionId(newSessionId);
      setError(null);

      // Cập nhật lịch sử
      await fetchChatHistory();
    } catch (err) {
      console.error('Error creating new chat:', err);
      setError('Không thể tạo cuộc trò chuyện mới.');
    }
  };

  const handleSelectSession = async (sessionId: string) => {
    const sessionMessages = await fetchSessionMessages(sessionId);
    setMessages(sessionMessages);
    setCurrentSessionId(sessionId);
    setError(null);
  };

  const handleSend = async () => {
    if (!input.trim() || !currentSessionId) return;
  
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
  
    try {
      const response = await fetch(`https://uniadvise-be-fastapi.onrender.com/api/chatbot/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user_id}`,
        },
        body: JSON.stringify({
          user_id: user_id,
          question: input,
          thread_id: currentSessionId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is null');
      }
      const decoder = new TextDecoder();
  
      let botResponse = '';
  
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
  
        const chunk = decoder.decode(value);
        const lines = chunk
          .split('\n')
          .filter((line) => line.trim() !== '' && line.startsWith('data: '));
  
        for (const line of lines) {
          try {
            const jsonStr = line.replace('data: ', '');
            const json = JSON.parse(jsonStr);
  
            if (json.error) {
              setError(json.error);
              return;
            }
  
            if (json.content) {
              botResponse += json.content;
  
              setMessages((prev) => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage.sender === 'bot') {
                  return [
                    ...prev.slice(0, -1),
                    { ...lastMessage, content: botResponse },
                  ];
                }
                return [
                  ...prev,
                  {
                    id: (Date.now() + 1).toString(),
                    content: botResponse,
                    sender: 'bot',
                    timestamp: new Date(),
                  },
                ];
              });
            }
          } catch (e) {
            console.error('Error parsing SSE message:', e);
          }
        }
      }
    } catch (error) {
      console.error('Stream error:', error);
      setError('Không thể gửi câu hỏi.');
    }
  };

  return (
    <Box py={8}>
      <Container maxW="1200px">
        <Flex height="70vh" gap={4}>
          {/* Sidebar */}
          <Box w="25%" bg="gray.100" p={4} borderRadius="lg" overflowY="auto">
            <Button colorScheme="green" mb={6} w="full" onClick={handleNewChat}>
              Tạo cuộc trò chuyện mới
            </Button>
            <Heading size="sm" mb={2}>
              Lịch sử trò chuyện
            </Heading>
            {error && (
              <Text color="red.500" mb={2}>
                {error}
              </Text>
            )}
            {history.length === 0 && !error ? (
              <Text color="gray.500">Chưa có cuộc trò chuyện nào.</Text>
            ) : (
              <VStack align="stretch" gap={2}>
                {history.map((session) => (
                  <Button
                    key={session.id}
                    variant={currentSessionId === session.id ? 'solid' : 'ghost'}
                    colorScheme="blue"
                    justifyContent="flex-start"
                    onClick={() => handleSelectSession(session.id)}
                  >
                    {session.title}
                  </Button>
                ))}
              </VStack>
            )}
          </Box>

          {/* Chat Area */}
          <VStack w="75%" align="stretch" height="100%">
            <Box flex={1} overflowY="auto" bg="gray.50" p={4} borderRadius="lg">
              {messages.map((message) => (
                <Flex
                  key={message.id}
                  justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                  mb={4}
                >
                  <Box
                    maxW="70%"
                    bg={message.sender === 'user' ? 'blue.500' : 'white'}
                    color={message.sender === 'user' ? 'white' : 'black'}
                    p={3}
                    borderRadius="lg"
                    boxShadow="sm"
                  >
                    <Text>{message.content}</Text>
                    <Text
                      fontSize="xs"
                      color={message.sender === 'user' ? 'white' : 'gray.500'}
                      mt={1}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Box>
            <Flex>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                mr={2}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button colorScheme="blue" onClick={handleSend}>
                Gửi
              </Button>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};