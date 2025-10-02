import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Curriculum from './pages/Curriculum';
import Coffee from './pages/Coffee';
import WaterCalc from './pages/WaterCalc';
import GrindCalc from './pages/GrindCalc';
import MineralCalc from './pages/MineralCalc';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/curriculum" component={Curriculum} />
        <Route exact path="/coffee" component={Coffee} />
        <Route path="/coffee/water-calc" component={WaterCalc} />
        <Route path="/coffee/grind-calc" component={GrindCalc} />
        <Route path="/coffee/mineral-calc" component={MineralCalc} />
      </Switch>
    </Router>
  );
};

export default App;
