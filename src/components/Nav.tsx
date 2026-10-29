import Link from "next/link";
export default function Nav() {
  return (<header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
    <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight"><span className="grid h-7 w-7 place-items-center rounded-md bg-accent font-mono text-sm text-night">₦</span>NairaRails</Link>
    <nav className="flex gap-5 text-sm text-mute"><Link href="/docs" className="hover:text-ink">Docs</Link><a href="https://github.com/Esimuda/nairarails" className="hover:text-ink">GitHub</a></nav>
  </header>);
}
