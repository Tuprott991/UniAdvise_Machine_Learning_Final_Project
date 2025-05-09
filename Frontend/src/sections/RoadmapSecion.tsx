"use client"

import { Button, Field, Input, Stack, Text, Box, Heading } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useState } from "react"

interface FormValues {
    career: string
    university: string
}

type RoadmapData = {
    [year: string]: {
        [semester: string]: {
            activities: string[]
            resources: string[]
            skills: string[]
            subjects: string[]
            tips: string[]
        }
    }
}

export const RoadmapSection = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const [roadmap, setRoadmap] = useState<RoadmapData | null>(null)

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await axios.post(
                'https://uniadvise-be-fastapi.onrender.com/api/advise/learning_path',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            const res_data = JSON.parse(response.data.learning_path.content)
            setRoadmap(res_data)
        } catch (error) {
            console.error('Error posting learning path:', error)
        }
    }

    return (
        <Stack gap={6} align="center" maxW="4xl" mx="auto" p={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="4" align="center" maxW="lg">
                    <Field.Root invalid={!!errors.university}>
                        <Field.Label>Trường</Field.Label>
                        <Input placeholder="Nhập trường đại học bạn quan tâm" {...register("university")} />
                        <Field.ErrorText>{errors.university?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.career}>
                        <Field.Label>Ngành học</Field.Label>
                        <Input placeholder="Nhập ngành học bạn quan tâm" {...register("career")} />
                        <Field.ErrorText>{errors.career?.message}</Field.ErrorText>
                    </Field.Root>

                    <Button type="submit">Submit</Button>
                </Stack>
            </form>

            {roadmap && (
                <Box w="full">
                    <Heading size="md" mb={4}>Lộ trình học tập gợi ý</Heading>
                    <Stack gap={4}>
                        {Object.entries(roadmap).map(([year, semesters]) => (
                            <Box key={year} p={4} borderWidth={1} borderRadius="lg">
                                <Heading size="sm" mb={2}>{year.toUpperCase()}</Heading>
                                {Object.entries(semesters).map(([semester, details]) => (
                                    <Box key={semester} pl={4} mb={3}>
                                        <Text fontWeight="bold">{semester.replace('_', ' ').toUpperCase()}</Text>
                                        {Object.entries(details).map(([key, items]) => (
                                            <Box key={key} mt={2}>
                                                <Text fontStyle="italic">
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                                </Text>
                                                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.25rem" }}>
                                                    {items.map((item, idx) => (
                                                        <li key={idx}>{item}</li>
                                                    ))}
                                                </ul>
                                            </Box>
                                        ))}
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}
        </Stack>
    )
}
