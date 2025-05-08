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
  createListCollection,
  Spinner,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { UniversityCard } from "../components/university/UniversityCard";
import { useEffect, useState } from "react";
import axios from "axios";

const sortOptions = createListCollection({
  items: [
    { label: "Sắp xếp theo tên", value: "name" },
  ],
});

const ITEMS_PER_PAGE = 9;

export const Universities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string[]>(["name"]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get("https://uniadvise-be-fastapi.onrender.com/api/uni_info/universities");
        setUniversities(response.data);
      } catch (err: any) {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể tải danh sách trường.");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filteredUniversities = universities
    .filter((university) =>
      university.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy.includes("name")) return a.name.localeCompare(b.name);
      return 0;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredUniversities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUniversities = filteredUniversities.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Box py={8}>
      <Container maxW="1200px">
        <Heading mb={8}>Danh sách trường đại học</Heading>

        <Stack direction={{ base: "column", md: "row" }} gap={4} mb={8}>
          <Input
            placeholder="Tìm kiếm theo tên trường"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
            }}
          />

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

        {loading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
              {currentUniversities.map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))}
            </SimpleGrid>

            {/* Pagination controls */}
            <HStack justify="center" mt={8}>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Trước
              </Button>
              <Text>
                Trang {currentPage} / {totalPages}
              </Text>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Tiếp
              </Button>
            </HStack>
          </>
        )}
      </Container>
    </Box>
  );
};
