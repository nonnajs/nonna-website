import { Link } from "@tanstack/react-router";
import { Menu, Moon, Star, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BrandIcon, Wordmark } from "./Icons";
import { REPO } from "@/content/snippets";

const links = [
  { to: "/docs", label: "Docs" },
  { to: "/architecture", label: "Architecture" },
  { to: "/ecosystem", label: "Ecosystem" },
  { to: "/compare", label: "Compare" },
  { to: "/samples", label: "Samples" },
] as const;

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("nonna-theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };
  return { dark, toggle };
}

function useStars() {
  const [stars, setStars] = useState<number | null>(null);
  useEffect(() => {
    fetch("https://api.github.com/repos/nonnajs/nonna")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.stargazers_count === "number") setStars(d.stargazers_count);
      })
      .catch(() => {});
  }, []);
  return stars;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const stars = useStars();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-lg" onClick={() => setOpen(false)}>
            <Wordmark />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:font-medium data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.npmjs.com/package/@nonnajs/di"
            target="_blank"
            rel="noreferrer"
            className="pill hidden sm:inline-flex hover:text-foreground"
          >
            <BrandIcon name="npm" className="size-3" />
            v1.0.0
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="pill hover:text-foreground"
            aria-label="GitHub repository"
          >
            <BrandIcon name="github" className="size-3.5" />
            <span className="hidden sm:inline">Star</span>
            {stars !== null && (
              <span className="flex items-center gap-0.5 border-l border-border pl-1.5 normal-case tracking-normal">
                <Star className="size-3" />
                {stars.toLocaleString()}
              </span>
            )}
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md border border-border text-muted-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground data-[status=active]:font-medium data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
