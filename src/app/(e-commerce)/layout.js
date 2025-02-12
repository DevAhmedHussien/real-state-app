
import "../globals.css";
import SlideBar from "./products/SlideBar";

export const metadata = {
  title: "E-Commerce - Clothes Store",
  description: "Browse our product catalog.",
};

export default function CommerceLayout({ children }) {
  return (
    <div className={`container mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
      <div className="flex flex-col lg:flex-row gap-8 align-start">
        {/* Sidebar */}
        <SlideBar />
        
        {/* Main Children */}
        <main className="flex justify-start align-center">{children}</main>
      </div>
    </div>
  );
}

