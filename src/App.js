import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicial from './pages/Inicial';  // Assuming this is the correct import for your Inicial component
import Display from './pages/Display';  // Assuming this is the correct import for your Display component
import Customizar from './pages/Customizar';  // Customizar route
import Pdm from './pages/Pdm';  // Importing Pdm component
import { ProjectProvider } from './elements/ProjectContext';  // Assuming ProjectProvider is from the correct path

function App() {
  return (
    <div className="App">
      <ProjectProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Inicial />} />
            <Route path="/home" element={<Display />} />
            <Route path="/calibra" element={<Customizar />} />

          </Routes>
        </Router>
      </ProjectProvider>
    </div>
  );
}

export default App;
