import { useQuery } from "@tanstack/react-query";
import { getLessionFromCourse, getLessonDetail } from "~/api/lession.api";
import { QUERIES_KEY } from "~/constants/queries-key";
import { QueryConfig } from "~/lib/react-query";
import { Response } from "~/types/common.type";
import { Lesson } from "~/types/lesson.type";

type UseLessonFromCourseOptions = {
  courseId: number;
  config?: QueryConfig<typeof getLessionFromCourse>;
};

export const useLessonFromCourse = ({
  config,
  courseId,
}: UseLessonFromCourseOptions) => {
  return useQuery<
    Response<{
      items: Lesson[];
    }>,
    Error
  >({
    queryKey: [QUERIES_KEY.LESSON.FROM_COURSE, courseId],
    queryFn: () => getLessionFromCourse(courseId),
    ...config,
  });
};

type UseLessonDetailOptions = {
  lessonId: number;
  config?: QueryConfig<typeof getLessonDetail>;
};

export const useLessonDetail = ({
  config,
  lessonId,
}: UseLessonDetailOptions) => {
  return useQuery<Response<Lesson>, Error>({
    queryKey: [QUERIES_KEY.LESSON.DETAIL, lessonId],
    queryFn: () => getLessonDetail(lessonId),
    ...config,
  });
};
