import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './scss/index.scss';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';

export const STORAGE_KEY = "spotixplore"
export const CLIENT_ID = "c051d36400f348d988e57b02dec4b384"
export const SCOPES = 'playlist-read-private playlist-read-collaborative';
export const REDIRECT_URI = "http://localhost:3000/auth-callback"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/auth-callback" component={Dashboard}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
