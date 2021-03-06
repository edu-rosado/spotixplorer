import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './scss/index.scss';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/Landing';
import { SpotifyDataProvider } from './context/SpotifyDataContext';
import { MenuSelectionProvider } from './context/MenuSelectionContext';

export const LOCAL_PREFIX = "spotixplore"
export const CLIENT_ID = "c051d36400f348d988e57b02dec4b384"
export const SCOPES = (
  'playlist-read-private'
  + ' playlist-read-collaborative'
  + ' user-top-read'
  + ' user-read-recently-played'
  + ' user-read-playback-position'
);
export const REDIRECT_URI = "http://localhost:3000/auth-callback"
export const TOKEN_DATA_LOCAL_KEY = "token-data"


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
            <SpotifyDataProvider>
            <MenuSelectionProvider>
              <Route path="/auth-callback" component={Dashboard}/>
            </MenuSelectionProvider>
            </SpotifyDataProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
