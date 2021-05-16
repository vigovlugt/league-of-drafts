import "../styles/global.css";
import Layout from "../components/Layout";
import Head from "next/head";

function App({ Component, pageProps }) {
    return (
        <Layout>
            <Head>
                <title>League of Drafts</title>
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}

export default App;
