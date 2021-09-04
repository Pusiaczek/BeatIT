import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { useContext } from 'react';
import GameContext from './store/game-context';

import Home from './home/Home';
import Shop from './shop/Shop';

import Navbar from './navbar/Navbar';
import styles from './App.module.css';
import Achievements from './achievements/Achievements';
import Footer from './footer/Footer';
import AchievementCompleteAlert from './components/AchievementCompleteAlert';


function App() {
  const ctx = useContext(GameContext)

  return (
    <div className={styles.App}>
      <Router>
        {/* <AchievementCompleteAlert /> */}
        
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>

          <Route path='/home'>
            <Home level={ctx.getCurrentLevel}
              beats={ctx.getCurrentBeats}
              bpmPower={ctx.getBpmPower} />
          </Route>

          <Route path='/shop'>
            <Shop
              data={ctx.getShopItemsData}
              inventory={ctx.getInventory} />
          </Route>

          <Route path='/achievements'>
            <Achievements data={ctx.getAchievements} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
