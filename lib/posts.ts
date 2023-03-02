/**
 * Here is the appropriate place to fetch data from external resources
 * or query it from a database:
 *  > https://nextjs.org/learn/basics/data-fetching/getstaticprops-details
 *  > https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details
 * See: ../pages/index.jsx and ../pages/posts/[id].jsx
 *
 * This is possible because getStaticProps only runs on the server-side.
 * It will never run on the client-side. It won’t even be included in the
 * JS bundle for the browser. That means you can write code such as direct
 * database queries without them being sent to browsers.
 *
 * Refs:
 * > https://remark.js.org/
 * > https://www.npmjs.com/package/gray-matter
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

interface MatterDataPosts {
  title: string;
  date: string;
}

export function getStoredPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // remove .md from the file name to get the id
    const id = fileName.replace(/\.md$/, "");

    // Read the markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post's metadata section
    //
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as MatterDataPosts),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  /**
   * The returned list must be an array of objects
   * that looks like:
   *  [
   *    {params: {id: "ssr-ssr"},},
   *    {params: {id: "..."},},
   *  ]
   * ... otherwise getStaticPaths() will fall,
   * see ../pages/posts/[id].js
   */

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ""),
    },
  }));
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // use gray-matters to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use 'remark' to convert Markdown into HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  // Combine the data with the "id" and return a new object
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
