import "./App.css";
import APIHealthCheck from "./components/APIHealthCheck";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>An app powered by content from Contentful</h1>
      </header>
      <APIHealthCheck />
    </div>
  );
}

export default App;
