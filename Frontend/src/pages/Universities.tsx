"use client";
import { Box, Container,  Heading, SimpleGrid, Input, Stack, Portal, Select, createListCollection } from "@chakra-ui/react";
import { UniversityCard } from "../components/university/UniversityCard";
import { universities } from "../constants/universities";
import { useState } from "react";

const sortOptions = createListCollection({
  items: [
    { label: "Sắp xếp theo tên", value: "name" },
    { label: "Sắp xếp theo đánh giá", value: "rating" },
    { label: "Sắp xếp theo học phí", value: "tuitionFee" },
  ],
});

export const Universities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string[]>(["name"]);

  const filteredUniversities = universities
    .filter(
      (university) =>
        university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy.includes("name")) return a.name.localeCompare(b.name);
      if (sortBy.includes("rating")) return b.rating - a.rating;
      if (sortBy.includes("tuitionFee")) return a.tuitionFee - b.tuitionFee;
      return 0;
    });

  return (
    <Box py={8}>
      <Container maxW="1200px">
        <Heading mb={8}>Danh sách trường đại học</Heading>

        <Stack direction={{ base: "column", md: "row" }} gap={4} mb={8}>
          <Input
            placeholder="Tìm kiếm theo tên trường hoặc địa điểm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Select mới của Chakra UI */}
          <Select.Root value={sortBy} onValueChange={({ value }) => setSortBy(value)} collection={sortOptions}>
            <Select.HiddenSelect />
            <Select.Label>Sắp xếp theo</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Chọn tiêu chí" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {sortOptions.items.map((option) => (
                    <Select.Item item={option} key={option.value}>
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
          {filteredUniversities.map((university) => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
