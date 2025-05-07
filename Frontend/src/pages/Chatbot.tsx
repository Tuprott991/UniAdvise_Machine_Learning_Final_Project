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

  // Lấy lịch sử từ API và sắp xếp mới nhất lên trên
  const fetchChatHistory = useCallback(async () => {
    try {
      const res = await axios.get<ChatSession[]>('http://localhost:8000/api/chat/history');
      // Sắp xếp theo id giảm dần (mới nhất lên trên)
      const sortedHistory = res.data.sort((a, b) => Number(b.id) - Number(a.id));
      setHistory(sortedHistory);
      return sortedHistory;
    } catch (err) {
      console.error('Error fetching chat history:', err);
      setError('Không thể tải lịch sử trò chuyện.');
      setHistory([]);
      return [];
    }
  }, []);

  // Lưu hoặc cập nhật cuộc trò chuyện
  const saveChat = async (session: ChatSession) => {
    try {
      await axios.post('http://localhost:8000/api/chat/save', session);
      // Tải lại lịch sử sau khi lưu
      await fetchChatHistory();
    } catch (err) {
      console.error('Error saving chat:', err);
      setError('Không thể lưu cuộc trò chuyện.');
    }
  };

  // Tải lịch sử khi component mount
  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  const handleNewChat = () => {
    // Lưu cuộc trò chuyện hiện tại nếu có tin nhắn người dùng và không ở session cũ
    if (!currentSessionId && messages.some((msg) => msg.sender === 'user')) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: messages.find((msg) => msg.sender === 'user')?.content.slice(0, 30) || 'Cuộc trò chuyện mới',
        messages,
      };
      saveChat(newSession);
    }

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
    setCurrentSessionId(null);
    setError(null);
  };

  const handleSelectSession = (sessionId: string) => {
    const session = history.find((s) => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
      setCurrentSessionId(sessionId);
      setError(null);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Nếu đang ở session cũ, cập nhật session
    if (currentSessionId) {
      const session = history.find((s) => s.id === currentSessionId);
      if (session) {
        const updatedSession: ChatSession = {
          ...session,
          messages: [...session.messages, userMessage],
        };
        await saveChat(updatedSession);
      }
    }

    // Simulate bot response
    setTimeout(async () => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Xin lỗi, hiện tại tôi chưa được kết nối với API để trả lời câu hỏi của bạn.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

      // Nếu đang ở session cũ, cập nhật lại với bot message
      if (currentSessionId) {
        const session = history.find((s) => s.id === currentSessionId);
        if (session) {
          const updatedSession: ChatSession = {
            ...session,
            messages: [...session.messages, botMessage],
          };
          await saveChat(updatedSession);
        }
      }
    }, 1000);
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
