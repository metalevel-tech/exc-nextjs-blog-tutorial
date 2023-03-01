/**
 * https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
 */
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
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
