import './App.css';
import Places from './placesSelection/places';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={`google-maps-icon.png`} className="App-logo" alt="logo" />
        <Places/>
      </header>
    </div>
  );
}

export default App;
