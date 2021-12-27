import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/js/bootstrap';
import Index from './Componants';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { BattleScreen } from './Componants/BattleScreen';
import { ItemsUses } from './Componants/ItemsUse';
// import '../node_modules/bootstrap/dist/js/bootstrap'

function App() {
  return (
    <div className="App">
      {/* <Index/> */}
      <BattleScreen Bag={[{Name:'TestItem',Use:(function(){console.log('Click')}),Type:'Battle'},{Name:'Pokeball',Use:(function(){return(ItemsUses.Pokeball(1))}),Type:'Battle'},{Name:'Ultraball',Use:(function(){ItemsUses.Pokeball(2)}),Type:'Battle'}]} Wp={{Name: null,Type1: '',Type2: null, Spec: '', img: ''}} Partner={{Name: "Test",Type1: "Ground",Type2: null, Spec: "Diglett", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png"}}/>
    </div>
  );
}

export default App;
