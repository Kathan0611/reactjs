
import './App.css';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom'; // Import Router instead of Routers
import RegisterPage from './login.js';

function App() {
  return (
    <Router> 
       <Routes>
            <Route path="/register" element={<RegisterPage/>} />
       </Routes>
    </Router>
  );
}

export default App;

