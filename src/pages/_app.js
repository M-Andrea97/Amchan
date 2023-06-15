import ProductProvider from "../contexts/product-context";
import Layout from "../components/layout";
import "../app/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
