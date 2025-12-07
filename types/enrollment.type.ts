export type Enrollment = {
  enrollment: {
    enrollmentId: number;
    courseId: number;
    courseTitle: string;
    ownerEmail: string;
    status: string;
    progressPercent: number;
    startedAt: string;
    completedAt: string;
  };
  lessons: {
    lessonProgressId: number;
    lessonId: number;
    lessonTitle: string;
    status: string;
    progressPercent: number;
    lastAccessTime: string;
  }[];
};
