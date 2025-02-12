import SpecificProductLayout from "@/layout/specificProductLayout/specificProductLayout";
import ReduxProvider from "@/redux/ReduxProvider";

export default function SpecificProductPage() {

  return (
    <>
    <ReduxProvider>
     <SpecificProductLayout/>
    </ReduxProvider>
    </>
  );
}