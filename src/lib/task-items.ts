import type { TaskFinderItem } from "@/components/task-finder";
import { guideBySlug } from "@/content/guides";
import { serviceBySlug } from "@/content/services";
import { tasks } from "@/content/tasks";

/** Resolve task references on the server so the client bundle only gets what it renders. */
export function taskFinderItems(): TaskFinderItem[] {
  return tasks.map((t) => {
    const guide = t.guide ? guideBySlug(t.guide) : undefined;
    return {
      id: t.id,
      label: t.label,
      answer: t.answer,
      help: t.help,
      bring: t.bring,
      whatsapp: t.whatsapp,
      tool: t.tool,
      services: t.services.flatMap((slug) => {
        const s = serviceBySlug(slug);
        return s ? [{ slug: s.slug, name: s.name }] : [];
      }),
      guide: guide ? { slug: guide.slug, title: guide.title, count: guide.checklist.length } : undefined,
    };
  });
}
