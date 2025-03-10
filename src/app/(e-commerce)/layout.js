
import "../globals.css";
import SlideBar from "./products/SlideBar";

export const metadata = {
  title: "E-Commerce - Clothes Store",
  description: "Browse our product catalog.",
};

export default function CommerceLayout({ children }) {
  return (
    <div className='mt-12 p-6'>
      <div className="flex flex-col lg:flex-row gap-8 align-start">
        <SlideBar />
        <main className="flex justify-start align-center">{children}</main>
      </div>
    </div>
  );
}

