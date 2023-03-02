/**
 * https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
 */
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};

interface Props {
  postData: {
    title: string;
    date: string;
    id: string;
    contentHtml: string;
  };
}
export default function Post({ postData }: Props) {
  const { title, date, id, contentHtml } = postData;

  return (
    <Layout title={`${title}`}>
      <h1 className={utilStyles.headingXl}>{title}</h1>
      <div className={utilStyles.lightText}>
        Date: <Date dateString={date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  );
}
