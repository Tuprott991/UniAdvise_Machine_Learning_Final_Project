"use client";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Input,
  Stack,
  Portal,
  Select,
  createListCollection
} from "@chakra-ui/react";
import { UniversityCard } from "../components/university/UniversityCard";
import { universities } from "../constants/universities";
import { useState } from "react";

const sortOptions = createListCollection({
  items: [
    { label: "Sắp xếp theo tên", value: "name" }
  ],
});

export const Universities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string[]>(["name"]);

  const filteredUniversities = universities
    .filter((university) =>
      university.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy.includes("name")) return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <Box py={8}>
      <Container maxW="1200px">
        <Heading mb={8}>Danh sách trường đại học</Heading>

        <Stack direction={{ base: "column", md: "row" }} gap={4} mb={8}>
          <Input
            placeholder="Tìm kiếm theo tên trường"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Select sắp xếp */}
          <Select.Root
            value={sortBy}
            onValueChange={({ value }) => setSortBy(value)}
            collection={sortOptions}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Sắp xếp theo" />
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
