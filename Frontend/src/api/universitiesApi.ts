import axiosClient from './axiosClient';
import { UniversitySection } from '../types/universityTypes';

export const getUniversityDetailsApi = async (id: string) => {
  const res = await axiosClient.get<UniversitySection[]>(
    `/uni_info/universities/${id}`
  );
  return res.data;
};

export const getAllUniversitiesApi = async () => {
  const res = await axiosClient.get('/uni_info/universities');
  return res.data;
}