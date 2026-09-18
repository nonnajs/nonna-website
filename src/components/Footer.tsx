import { Link } from "@tanstack/react-router";
import { Github, Linkedin } from "lucide-react";
import { Wordmark } from "./Icons";
import { REPO, packages } from "@/content/snippets";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Wordmark className="text-xl" />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Dependency injection without the reflection tax. Zero deps, zero reflection, every
            runtime.
          </p>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            MIT License · Manuel Santos
          </p>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Site</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amber">Home</Link></li>
            <li><Link to="/docs" className="hover:text-amber">Docs</Link></li>
            <li><Link to="/architecture" className="hover:text-amber">Architecture</Link></li>
            <li><Link to="/ecosystem" className="hover:text-amber">Ecosystem</Link></li>
            <li><Link to="/compare" className="hover:text-amber">Compare</Link></li>
            <li><Link to="/samples" className="hover:text-amber">Samples</Link></li>
            <li>
              <a href={REPO} target="_blank" rel="noreferrer" className="hover:text-amber">
                GitHub
              </a>
            </li>
            <li>
              <a href={`${REPO}/releases`} target="_blank" rel="noreferrer" className="hover:text-amber">
                Changelog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Ecosystem
          </h4>
          <ul className="mt-3 space-y-2 font-mono text-[13px]">
            {packages.map((p) => (
              <li key={p.name}>
                <a
                  href={`https://www.npmjs.com/package/${p.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-amber"
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 font-mono text-xs text-muted-foreground sm:px-6">
          © Nonna. MIT Licensed. Built by Manuel Santos.
        </p>
      </div>
    </footer>
  );
}
