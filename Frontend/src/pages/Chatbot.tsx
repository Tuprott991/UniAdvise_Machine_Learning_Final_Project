import { Box, Container, VStack, Input, Button, Text, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { ChatMessage } from '../types/models';

export const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Xin chào! Tôi có thể giúp gì cho bạn về tuyển sinh đại học?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Xin lỗi, hiện tại tôi chưa được kết nối với API để trả lời câu hỏi của bạn.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <Box py={8}>
      <Container maxW="800px">
        <VStack gap={4} align="stretch" height="70vh">
          <Box flex={1} overflowY="auto" bg="gray.50" p={4} borderRadius="lg">
            {messages.map(message => (
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
                  <Text fontSize="xs" color={message.sender === 'user' ? 'white' : 'gray.500'} mt={1}>
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
      </Container>
    </Box>
  );
};