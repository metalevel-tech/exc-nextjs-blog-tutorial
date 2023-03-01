import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
// import Script from "next/script";

const name = "Spas Z. Spasov";
export const siteTitle = "Next.js Sample Website";

export default function Layout({
  children,
  home,
  title = "Create Next.js App",
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>

        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn Next.js basics" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* https://nextjs.org/learn/basics/assets-metadata-css/third-party-javascript
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log(`script loaded correctly, window.FB has been populated.`);
        }} 
      />
      */}
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile-szs.jpg"
              className={utilStyles.borderCircle}
              width={144}
              height={144}
              alt="Avatar image"
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile-szs.jpg"
                className={utilStyles.borderCircle}
                width={108}
                height={108}
                alt="Avatar image"
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
