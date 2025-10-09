import { API_ENDPOINTS } from "~/constants/api";
import { http } from "~/lib/http";
import { Response } from "~/types/common.type";
import { Enrollment } from "~/types/enrollment.type";

export const getEnrollmentFromCourse = (courseId: number) =>
  http.get<Response<Enrollment>>(
    API_ENDPOINTS.ENROLLMENT.FROM_COURSE.replace(
      ":courseId",
      courseId.toString()
    )
  );

export const getMyEnrollments = () => {
  return http.get<Response<Enrollment[]>>(
    API_ENDPOINTS.ENROLLMENT.MY_ENROLLMENTS
  );
};
