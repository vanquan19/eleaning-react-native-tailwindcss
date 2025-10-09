import { API_ENDPOINTS } from "~/constants/api";
import { http } from "~/lib/http";
import { Response } from "~/types/common.type";
import { Course } from "~/types/course.type";

export const getCoursesApi = async () => {
  console.log("Fetching courses...");
  return http.get<
    Response<{
      items: Course[];
    }>
  >(API_ENDPOINTS.COURSE.GET);
};

export const getCoursesWithTitleApi = async (title: string) => {
  return http.get<
    Response<{
      items: Course[];
    }>
  >(API_ENDPOINTS.COURSE.GET_TITLE, {
    params: { title },
  });
};

export const getCourseDetailApi = async (courseId: string) => {
  return http.get<Response<Course>>(
    API_ENDPOINTS.COURSE.GET_DETAIL.replace(":courseId", courseId)
  );
};

export const getMyCoursesApi = async () => {
  return http.get<
    Response<{
      items: Course[];
    }>
  >(API_ENDPOINTS.COURSE.MY_COURSES);
};
