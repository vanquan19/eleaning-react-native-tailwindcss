import { Course } from "~/types/course.type";

export type CartItem = {
  id: string;
  price: number;
  quantity: number;
  course: Course;
};
