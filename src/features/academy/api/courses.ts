import type { Course, CourseDetail } from "../types/academy.types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getCourses(): Promise<Course[]> {
  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/api/v1/courses`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const json = await res.json();
    return json.data as Course[];
  } catch {
    return [];
  }
}

export async function getCourse(id: string): Promise<CourseDetail | null> {
  if (!apiUrl) return null;

  try {
    const res = await fetch(`${apiUrl}/api/v1/courses/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data as CourseDetail;
  } catch {
    return null;
  }
}
