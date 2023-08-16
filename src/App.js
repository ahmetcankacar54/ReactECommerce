import "./App.css";
import Dashboard from "./layouts/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </div>
  );
}
export default App;
