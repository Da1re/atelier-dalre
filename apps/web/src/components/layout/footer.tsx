import { ContactCards } from "./contact-cards";

export const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-foreground/8">
      <div className="px-5 md:px-15 pt-12 md:pt-20 pb-10 flex flex-col min-h-80">
        <h2
          className="mb-8 md:mb-12 font-normal tracking-[-2px] md:tracking-[-4px] leading-[0.95] text-foreground"
          style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
        >
          Let&apos;s work
          <br />
          together.
        </h2>
        <ContactCards />
        <div className="flex justify-end mt-10 md:mt-16 pt-6 border-t border-foreground/10">
          <p className="text-[12px] text-foreground/70">Dalre &copy; 2026</p>
        </div>
      </div>
    </footer>
  );
};
