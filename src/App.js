import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { useContext, useEffect } from 'react';
import GameContext from './store/game-context';

import Home from './home/Home';
import Shop from './shop/Shop';

import Navbar from './navbar/Navbar';
import styles from './App.module.css';
import Achievements from './achievements/Achievements';



function App() {
  const ctx = useContext(GameContext)

  useEffect(() => {
    const tick = setInterval(() => {
      console.log('tick', ctx.getInventory);
      




    }, 1000)

    return ( () => {
      clearInterval(tick)
    })
  }, [ctx.getInventory])




  return (
    <Router>
      <div className={styles.App}>
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
              beats={ctx.getCurrentBeats}
              inventory={ctx.getInventory} />
          </Route>

          <Route path='/achievements'>
            <Achievements />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
