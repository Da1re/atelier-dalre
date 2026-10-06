import clsx from "clsx";

const TONE_CLASS = {
  ink: "bg-foreground text-background",
  accent: "bg-accent text-accent-foreground",
  outline: "border-[1.5px] border-foreground/45 text-foreground",
} as const;

interface Contact {
  key: string;
  label: string;
  href: string;
  address: string;
  tone: keyof typeof TONE_CLASS;
  external: boolean;
}

const CONTACTS: Contact[] = [
  {
    key: "email",
    label: "Email",
    href: "mailto:wien200922@gmail.com",
    address: "wien200922@gmail.com",
    tone: "ink",
    external: false,
  },
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/Da1re",
    address: "github.com/Da1re",
    tone: "accent",
    external: true,
  },
  {
    key: "tistory",
    label: "Tistory",
    href: "https://dalre.tistory.com/",
    address: "dalre.tistory.com",
    tone: "outline",
    external: true,
  },
];

export function ContactCards() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
      {CONTACTS.map((contact) => (
        <li
          key={contact.key}
          className={clsx(
            "group relative rounded-[28px] p-6.5 min-h-34 md:min-h-42.5 flex flex-col justify-between gap-6 transition-[translate,box-shadow] duration-300 ease-out hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1",
            TONE_CLASS[contact.tone],
          )}
        >
          <a
            href={contact.href}
            target={contact.external ? "_blank" : undefined}
            rel={contact.external ? "noopener noreferrer" : undefined}
            className="flex items-center justify-between text-[26px] md:text-[30px] font-semibold tracking-[-0.03em] leading-none cursor-pointer after:absolute after:inset-0 after:rounded-[28px]"
          >
            {contact.label}
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>
          <p className="relative z-10 pt-3 border-t-[1.5px] border-current font-mono text-[12.5px] opacity-85 break-all cursor-text">
            {contact.address}
          </p>
        </li>
      ))}
    </ul>
  );
}
