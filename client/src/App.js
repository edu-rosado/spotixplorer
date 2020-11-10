import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './scss/index.scss';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';

export const LOCAL_PREFIX = "spotixplore"
export const CLIENT_ID = "c051d36400f348d988e57b02dec4b384"
export const SCOPES = 'user-read-private playlist-read-private playlist-read-collaborative';
export const REDIRECT_URI = "http://localhost:3000/auth-callback"
export const TOKEN_DATA_LOCAL_KEY = "token-data"
export const PLAYLIST_SET_LOCAL_KEY = "playlist-set"

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
