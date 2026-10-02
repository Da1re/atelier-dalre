import type { DesignNote } from "@/models/design-system-docs";

interface DesignNoteListProps {
  notes: DesignNote[];
  heading?: string;
  eyebrow?: string;
}

export function DesignNoteList({
  notes,
  heading = "설계 노트",
  eyebrow = "Design Decisions",
}: DesignNoteListProps) {
  if (notes.length === 0) return null;

  return (
    <div>
      <div className="flex items-baseline gap-3 mb-8">
        <h2 className="text-[11px] tracking-[2px] uppercase text-foreground/40 font-medium">
          {heading}
        </h2>
        <span className="text-[11px] text-foreground/30 font-mono">
          {eyebrow}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {notes.map((note, i) => (
          <article
            key={note.title}
            className="rounded-[14px] border border-foreground/10 bg-foreground/2 p-6 md:p-7"
          >
            <div className="flex items-center gap-3 mb-3.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-[12px] font-semibold tabular-nums shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[15px] md:text-base font-semibold text-foreground leading-snug">
                {note.title}
              </h3>
            </div>
            <p className="text-[14px] text-foreground/65 leading-[1.85]">
              {note.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
