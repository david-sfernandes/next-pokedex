import Head from "next/head";
import GoTop from "./GoTop";
import Header from "./Header";

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div className="loadingCard">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
      <GoTop />
    </div>
  );
}
