import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";

export default function FirstPost() {
  return (
    <Layout title={`Blog post #1`}>
      <h1>First post</h1>
      <p>This is the first post content...</p>
    </Layout>
  );
}
