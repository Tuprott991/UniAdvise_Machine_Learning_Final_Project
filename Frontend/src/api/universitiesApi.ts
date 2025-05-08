import axios from 'axios';

export interface UniversitySection {
  id: number;
  section: string;
  content: string;
}

export const universityDetailsApi = async (id: string) => {
  const res = await axios.get<UniversitySection[]>(
    `https://uniadvise-be-fastapi.onrender.com/api/uni_info/universities/${id}`
  );
  return res.data;
};
