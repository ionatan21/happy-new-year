import "./App.css";
import CountdownToNewYear from "./components/Countdown/CountdownToNewYear";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Analytics />
      <CountdownToNewYear />
    </>
  );
}

export default App;
