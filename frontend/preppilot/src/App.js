import Button from './components/button';
import Header from './components/header'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />  
      <h2 className="h2">PrepPilot</h2>
      <Button text="Get Started" variant="primary" />
    </div>
  );
}

export default App;
