import "./App.css";
import DummyJSON from "./components/DummyJSON";
import GeneratePDFData from "./components/GeneratePDFData";
import InlineCSSDemo from "./components/InlineCSSDemo";
import JSONPlaceholder from "./components/JSONPlaceholder";

function App() {
  return (
    <>
      <DummyJSON />
      <InlineCSSDemo />
      <JSONPlaceholder />
      <GeneratePDFData />
    </>
  );
}

export default App;
