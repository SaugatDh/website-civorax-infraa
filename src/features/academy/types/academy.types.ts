export type Course = {
  id: number;
  title: string;
  description: string;
  type: string;
  duration: string;
  fee: number;
  discount_fee: number | null;
  cover_image_url: string | null;
};

export type CourseDetail = Course & {
  syllabus: string;
};
