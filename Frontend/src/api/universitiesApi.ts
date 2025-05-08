/**
 * API utilities for interacting with university-related endpoints from the UniAdvise backend.
 *
 * @module universitiesApi
 */

import axiosClient from './axiosClient';
import { UniversitySection } from '../types/universityTypes';

/**
 * Fetches detailed information for a specific university by its ID.
 *
 * @param id - The unique identifier of the university.
 * @returns A promise that resolves to an array of {@link UniversitySection} objects representing university content sections.
 *
 * @example
 * ```ts
 * const details = await getUniversityDetailsApi('mit');
 * ```
 */
export const getUniversityDetailsApi = async (id: string) => {
  const res = await axiosClient.get<UniversitySection[]>(
    `/uni_info/universities/${id}`
  );
  return res.data;
};

/**
 * Fetches a list of all universities from the API.
 *
 * @returns A promise that resolves to an array of university metadata or summaries.
 *
 * @example
 * ```ts
 * const universities = await getAllUniversitiesApi();
 * ```
 */
export const getAllUniversitiesApi = async () => {
  const res = await axiosClient.get('/uni_info/universities');
  return res.data;
};
