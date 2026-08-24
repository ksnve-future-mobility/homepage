import type { MetadataRoute } from "next";
import { getNotices } from "@/lib/notices";
import { getAcademicEvents } from "@/lib/events";

const baseUrl = "https://ksnve-mobility.vercel.app";

const staticPaths = [
  "",
  "/about",
  "/study-groups",
  "/events",
  "/events/before-2026",
  "/networking-seminars",
  "/workshops",
  "/future-mobility-talk",
  "/notices",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [notices, events] = await Promise.all([getNotices(), getAcademicEvents()]);

  const staticRoutes = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const noticeRoutes = notices.map((notice) => ({
    url: `${baseUrl}/notices/${notice.id}`,
    lastModified: new Date(),
  }));

  const eventRoutes = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...noticeRoutes, ...eventRoutes];
}
