import {
    Button,
    ButtonGroup,
    Container,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CareerSection, RoadmapSection } from '../sections/index';

export const RoadMap = () => {
    const [activeTab, setActiveTab] = useState<'career' | 'roadmap'>('career');

    return (
        <Container maxW="xl" py={6}>
            <ButtonGroup attached variant="outline" mb={4} display={{ base: 'block', md: 'flex' }} justifyContent={'center'} gap={4}>
                <Button
                    variant={activeTab === 'career' ? 'solid' : 'outline'}
                    colorScheme="teal"
                    onClick={() => setActiveTab('career')}
                >
                    Tư vấn ngành nghề
                </Button>
                <Button
                    variant={activeTab === 'roadmap' ? 'solid' : 'outline'}
                    colorScheme="teal"
                    onClick={() => setActiveTab('roadmap')}
                >
                    Thiết kế lộ trình học tập
                </Button>
            </ButtonGroup>


            {activeTab === 'career' && (
                <CareerSection />
            )}

            {activeTab === 'roadmap' && (
                <RoadmapSection />
            )}
        </Container>
    );
};
