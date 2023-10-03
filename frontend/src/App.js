import { Route } from 'react-router-dom';
import './App.css';
import Home from './Paginas/Home';
import Chat from './Paginas/Chat';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Home} exact/>
      <Route path="/chats" component={Chat}/>
    </div>
  );
}

export default App;
