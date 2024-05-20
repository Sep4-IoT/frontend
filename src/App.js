//App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Greenhouse from './routes/GreenhousePage';
import History from './routes/HistoryPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/greenhouse" element={<Greenhouse />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};


export default App;

