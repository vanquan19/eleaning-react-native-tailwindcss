import { LessonType } from "~/types/enum";

export type Lesson = {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  resourceUrl: string;
  type: LessonType;
  orderIndex: number;
  courseId: number;
  chapterId: number;
  durationMinutes: number;
};
