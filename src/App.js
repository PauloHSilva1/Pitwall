import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Inicial from './pages/Inicial'
import Display from './pages/Display'
import Customizar from './pages/Customizar'
import {ProjectProvider} from './elements/ProjectContext'
function App() {
  return (
    <div className="App">
      <ProjectProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Inicial/>}/>
          <Route path= "/home" element={<Display/>}/>
          <Route path="/calibra" element= {<Customizar/>}/>
        </Routes>
      </Router>
      </ProjectProvider>
    </div>
  );
}

export default App;
