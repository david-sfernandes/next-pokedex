import Link from "next/link";
import GithubIcon from "./icons/GithubIcon";

export default function Header() {
  return (
    <header
      className="header"
      id="header"
    >
      <Link href="/">
        <h2 className="font-medium text-xl hover:underline">Home</h2>
      </Link>
      <a
        href="https://github.com/david-sfernandes"
        className="headerBtn"
      >
        <GithubIcon />
        David Sousa
      </a>
    </header>
  );
}
