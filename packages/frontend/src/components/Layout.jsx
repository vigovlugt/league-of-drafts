import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col bg-dark-0 text-white font-body min-h-screen">
            <Navbar />
            <div>{children}</div>
        </div>
    );
}
