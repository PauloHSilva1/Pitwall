import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Inicial from './pages/Inicial'
import Home from './pages/Home'
import {ProjectProvider} from './elements/ProjectContext'
function App() {
  return (
    <div className="App">
      <ProjectProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Inicial/>}/>
          <Route path= "/home" element={<Home/>}/>
        </Routes>
      </Router>
      </ProjectProvider>
    </div>
  );
}

export default App;
