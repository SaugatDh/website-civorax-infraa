import { notFound } from "next/navigation";
import { getCourse } from "@/features/academy/api/courses";
import CourseDetailPage from "@/features/academy/components/CourseDetailPage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  return <CourseDetailPage course={course} />;
}
