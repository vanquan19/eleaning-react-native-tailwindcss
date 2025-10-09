import { useQuery } from "@tanstack/react-query";
import {
  getCourseDetailApi,
  getCoursesApi,
  getCoursesWithTitleApi,
  getMyCoursesApi,
} from "~/api/course.api";
import { QUERIES_KEY } from "~/constants/queries-key";
import { QueryConfig } from "~/lib/react-query";
import { Response } from "~/types/common.type";
import { Course } from "~/types/course.type";

type UseListCourseOptions = { config?: QueryConfig<typeof getCoursesApi> };

export const useListCourse = ({ config }: UseListCourseOptions) => {
  return useQuery<
    Response<{
      items: Course[];
    }>,
    Error
  >({
    queryKey: [QUERIES_KEY.COURSE.LIST],
    queryFn: getCoursesApi,
    ...config,
  });
};

type UseListCourseWithTitleOptions = {
  title: string;
  config?: QueryConfig<typeof getCoursesWithTitleApi>;
};

export const useListCourseWithTitle = ({
  title,
  config,
}: UseListCourseWithTitleOptions) => {
  return useQuery<
    Response<{
      items: Course[];
    }>,
    Error
  >({
    queryKey: [QUERIES_KEY.COURSE.LIST, title],
    queryFn: () => getCoursesWithTitleApi(title),
    ...config,
  });
};

type UseCourseDetailOptions = {
  courseId: string;
  config?: QueryConfig<typeof getCourseDetailApi>;
};

export const useCourseDetail = ({
  courseId,
  config,
}: UseCourseDetailOptions) => {
  return useQuery<Response<Course>, Error>({
    queryKey: [QUERIES_KEY.COURSE.DETAIL, courseId],
    queryFn: () => getCourseDetailApi(courseId),
    ...config,
  });
};

type UseMyCoursesOptions = { config?: QueryConfig<typeof getMyCoursesApi> };

export const useMyCourses = ({ config }: UseMyCoursesOptions) => {
  return useQuery<
    Response<{
      items: Course[];
    }>,
    Error
  >({
    queryKey: [QUERIES_KEY.COURSE.MY_COURSES],
    queryFn: getMyCoursesApi,
    ...config,
  });
};
