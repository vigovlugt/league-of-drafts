import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Oswald:wght@200;500;600;700&display=swap"
                        rel="stylesheet"
                    />
                    <title>League of Drafts</title>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default Document;
