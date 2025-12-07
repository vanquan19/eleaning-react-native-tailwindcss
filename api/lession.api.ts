import { toString } from "lodash-es";
import { API_ENDPOINTS } from "~/constants/api";
import { http } from "~/lib/http";
import { Response } from "~/types/common.type";
import { Lesson } from "~/types/lesson.type";

export const getLessionFromCourse = (courseId: number) => {
  return http.get<Response<{ items: Lesson[] }>>(
    API_ENDPOINTS.LESSON.GET_FROM_COURSE.replace(
      ":courseId",
      toString(courseId)
    )
  );
};

export const getLessonDetail = (lessonId: number) => {
  return http.get<Response<Lesson>>(
    API_ENDPOINTS.LESSON.GET_DETAIL.replace(":lessonId", toString(lessonId))
  );
};
