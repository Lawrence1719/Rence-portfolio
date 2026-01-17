import { notFound } from "next/navigation";

export default function ProjectDetailPage() {
  // Since individual project pages are not implemented,
  // show 404 for any project slug
  notFound();
}