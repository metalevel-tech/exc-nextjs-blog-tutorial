import { GetStaticProps } from "next";
import Link from "next/link";
import Date from "../components/date";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getStoredPostsData } from "../lib/posts";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getStoredPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};

interface Props {
  allPostsData: {
    id: string;
    date: string;
    title: string;
  }[];
}

export default function Home({ allPostsData }: Props) {
  return (
    <Layout home title="Create Next.js App">
      <section className={utilStyles.headingMd}>
        <p>This is my first touch with Next.js... TypeScript migrated...</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
