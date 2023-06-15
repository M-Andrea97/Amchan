import "../app/globals.css";
import Footer from "./footer";
import Navbar from "./navbar";


export default function Layout({ children }) {
  return (
    <>
      <div className="flex h-screen bg-slate-50">
        <Navbar />
        <div className="flex-1 m-5 ">{children}</div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
