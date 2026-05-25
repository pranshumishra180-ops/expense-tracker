import {Routes,Route,} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />

<Route
  path="/dashboard"
  element={<Dashboard />}
/>

<Route
  path="/analytics"
  element={<Analytics />}
/>

      <Route
        path="/register"
        element={<Register />}
      />
    </Routes>
  );
}



export default App;