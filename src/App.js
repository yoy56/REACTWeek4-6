import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/js/bootstrap';
import Index from './Componants';
//import '../src/custom.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { BattleScreen } from './Componants/BattleScreen';

import { dataCalc } from './Componants/data';
// import '../node_modules/bootstrap/dist/js/bootstrap'

function App() {
  return (
    <div className="App">
      <Index/>
    </div>
  );
}

export default App;
