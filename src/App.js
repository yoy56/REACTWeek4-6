import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/js/bootstrap';
import Index from './Componants';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { BattleScreen } from './Componants/BattleScreen';

import { dataCalc } from './Componants/data';
// import '../node_modules/bootstrap/dist/js/bootstrap'

function App() {
  return (
    <div className="App">
      <Index PList={dataCalc.getplist()} Partner={dataCalc.getpartner()} Bag={dataCalc.getbag()} Wp={dataCalc.getwp()}/>
    </div>
  );
}

export default App;
