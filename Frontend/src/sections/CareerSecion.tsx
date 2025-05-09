"use client"

import { Button, Field, Input, Stack, NativeSelect } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useState } from 'react'

interface FormValues {
    name: string,
    birth_year: number,
    gender: string,
    favorite_subjects: string,
    strong_skills: string,
    weak_skills: string,
    hobbies: string,
    values: string,
    personality: string,
    soft_skills: string,
    desired_salary: string,
    preferred_location: string,
    financial_limit: string,
    preferred_school_type: string,
}

export const CareerSection = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const [careerSuggestions, setCareerSuggestions] = useState<any>(null);

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await axios.post(
                'https://uniadvise-be-fastapi.onrender.com/api/advise/recommend_career', { user_profile: JSON.stringify(data) },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const res_data = JSON.parse(response.data.career_suggestions.content);
            setCareerSuggestions(res_data)

            // Hiển thị thông báo thành công
        } catch (error) {
            console.error('Error posting learning path:', error)

            // Hiển thị thông báo lỗi
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="4" align="center" maxW="lg">
                <Field.Root invalid={!!errors.name}>
                    <Field.Label>Họ tên</Field.Label>
                    <Input placeholder="Nhập họ tên của bạn" {...register("name", { required: "Họ tên là bắt buộc" })} />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.birth_year}>
                    <Field.Label>Năm sinh</Field.Label>
                    <Input
                        type="number"
                        placeholder="Nhập năm sinh của bạn"
                        {...register("birth_year", {
                            valueAsNumber: true,
                            required: "Năm sinh là bắt buộc",
                            min: { value: 1900, message: "Năm sinh không hợp lệ" },
                            max: { value: new Date().getFullYear(), message: "Năm sinh không hợp lệ" }
                        })}
                    />
                    <Field.ErrorText>{errors.birth_year?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.gender}>
                    <Field.Label>Giới tính</Field.Label>
                    <NativeSelect.Root defaultValue="Nam" {...register("gender", { required: "Giới tính là bắt buộc" })}>
                        <NativeSelect.Field>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    <Field.ErrorText>{errors.gender?.message}</Field.ErrorText>
                </Field.Root>

                {/* Các field còn lại với validation */}
                <Field.Root invalid={!!errors.favorite_subjects}>
                    <Field.Label>Chọn môn học yêu thích</Field.Label>
                    <NativeSelect.Root defaultValue="Toán" {...register("favorite_subjects", { required: "Chọn môn học yêu thích là bắt buộc" })}>
                        <NativeSelect.Field>
                            <option value="Toán">Toán</option>
                            <option value="Lý">Lý</option>
                            <option value="Hóa">Hóa</option>
                            <option value="Sinh">Sinh</option>
                            <option value="Tin">Tin</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    <Field.ErrorText>{errors.favorite_subjects?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.strong_skills}>
                    <Field.Label>Điểm mạnh</Field.Label>
                    <Input placeholder="Nhập điểm mạnh của bạn" {...register("strong_skills", { required: "Điểm mạnh là bắt buộc" })} />
                    <Field.ErrorText>{errors.strong_skills?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.weak_skills}>
                    <Field.Label>Điểm yếu</Field.Label>
                    <Input placeholder="Nhập điểm yếu của bạn" {...register("weak_skills", { required: "Điểm yếu là bắt buộc" })} />
                    <Field.ErrorText>{errors.weak_skills?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.hobbies}>
                    <Field.Label>Sở thích</Field.Label>
                    <Input placeholder="Nhập sở thích của bạn" {...register("hobbies", { required: "Sở thích là bắt buộc" })} />
                    <Field.ErrorText>{errors.hobbies?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.values}>
                    <Field.Label>Giá trị</Field.Label>
                    <Input placeholder="Nhập giá trị của bạn" {...register("values", { required: "Giá trị là bắt buộc" })} />
                    <Field.ErrorText>{errors.values?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.personality}>
                    <Field.Label>Tính cách</Field.Label>
                    <Input placeholder="Nhập tính cách của bạn" {...register("personality", { required: "Tính cách là bắt buộc" })} />
                    <Field.ErrorText>{errors.personality?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.soft_skills}>
                    <Field.Label>Kỹ năng mềm</Field.Label>
                    <Input placeholder="Nhập kỹ năng mềm của bạn" {...register("soft_skills", { required: "Kỹ năng mềm là bắt buộc" })} />
                    <Field.ErrorText>{errors.soft_skills?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.desired_salary}>
                    <Field.Label>Mức lương mong muốn</Field.Label>
                    <Input placeholder="Nhập mức lương mong muốn của bạn" {...register("desired_salary", { required: "Mức lương mong muốn là bắt buộc" })} />
                    <Field.ErrorText>{errors.desired_salary?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.preferred_location}>
                    <Field.Label>Địa điểm làm việc mong muốn</Field.Label>
                    <Input placeholder="Nhập địa điểm làm việc mong muốn của bạn" {...register("preferred_location", { required: "Địa điểm làm việc là bắt buộc" })} />
                    <Field.ErrorText>{errors.preferred_location?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.financial_limit}>
                    <Field.Label>Giới hạn tài chính</Field.Label>
                    <Input placeholder="Nhập giới hạn tài chính của bạn" {...register("financial_limit", { required: "Giới hạn tài chính là bắt buộc" })} />
                    <Field.ErrorText>{errors.financial_limit?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.preferred_school_type}>
                    <Field.Label>Loại trường mong muốn</Field.Label>
                    <NativeSelect.Root defaultValue="Đại học" {...register("preferred_school_type", { required: "Loại trường là bắt buộc" })}>
                        <NativeSelect.Field>
                            <option value="Đại học">Đại học</option>
                            <option value="Cao đẳng">Cao đẳng</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    <Field.ErrorText>{errors.preferred_school_type?.message}</Field.ErrorText>
                </Field.Root>

                <Button type="submit">Submit</Button>

                {/* Hiển thị gợi ý nghề nghiệp */}
                {careerSuggestions && (
                    <div style={{ marginTop: '16px' }}>
                        <h3>Career Suggestions:</h3>
                        <div>
                            {Object.keys(careerSuggestions).map((key) => (
                                <div key={key}>
                                    <h4>{careerSuggestions[key].name}</h4>
                                    <p>{careerSuggestions[key].reason}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Stack>
        </form>
    )
}
