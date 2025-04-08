
import "../globals.css";
import SlideBar from "./city/SlideBar";

export const metadata = {
  title: "E-Commerce - Clothes Store",
  description: "Browse our product catalog.",
};

export default function CommerceLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto mt-10  py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar: occupies 1/4 of the width on medium+ screens */}
          <aside className="md:col-span-1">
            <SlideBar />
          </aside>

          {/* Main content: occupies 3/4 of the width on medium+ screens */}
          <main className="md:col-span-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
