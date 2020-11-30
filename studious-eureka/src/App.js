import Home from './Components/Home'
import Video from './Components/Video'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:url" component={Video} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
