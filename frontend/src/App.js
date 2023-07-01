import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Layout from "./components/Layout";

// Page Imports
import ManageStaff from "./pages/ManageStaff";
import UnderConstruction from "./pages/UnderConstruction";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/manage-staff" element={<ManageStaff />} />
          <Route path="*" element={<UnderConstruction />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
