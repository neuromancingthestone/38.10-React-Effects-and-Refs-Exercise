import logo from './logo.svg';
import Cards from './Cards';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container text-center h-100 d-inline-block">
        <li className="list-group-item list-group-item-success d-flex justify-content-between align-items-center">
          <Cards />
        </li>
      </div>
    </div>
  );
}

export default App;
