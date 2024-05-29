import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import GreenhousePage from './routes/GreenhousePage';
import HomePage from './routes/HomePage';
import HistoryPage from './routes/HistoryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <Switch>
          <Route path="/home" component={HomePage} /> 
          <Route path="/greenhouse" component={GreenhousePage} />
          <Route path="/history" component={HistoryPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
