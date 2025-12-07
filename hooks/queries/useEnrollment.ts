import { useQuery } from "@tanstack/react-query";
import {
  getEnrollmentFromCourse,
  getMyEnrollments,
} from "~/api/enrollment.api";
import { QUERIES_KEY } from "~/constants/queries-key";
import { QueryConfig } from "~/lib/react-query";
import { Response } from "~/types/common.type";
import { Enrollment } from "~/types/enrollment.type";

type UseEnrollmentFromCourseOptions = {
  courseId: number;
  config?: QueryConfig<typeof getEnrollmentFromCourse>;
};

export const useEnrollmentFromCourse = ({
  config,
  courseId,
}: UseEnrollmentFromCourseOptions) => {
  return useQuery<Response<Enrollment>, Error>({
    queryKey: [QUERIES_KEY.ENROLLMENT.FROM_COURSE, courseId],
    queryFn: () => getEnrollmentFromCourse(courseId),
    ...config,
  });
};

type UseMyEnrollmentsOptions = {
  config?: QueryConfig<typeof getMyEnrollments>;
};

export const useMyEnrollments = ({ config }: UseMyEnrollmentsOptions) => {
  return useQuery<Response<Enrollment[]>, Error>({
    queryKey: [QUERIES_KEY.ENROLLMENT.MY_ENROLLMENTS],
    queryFn: getMyEnrollments,
    ...config,
  });
};
