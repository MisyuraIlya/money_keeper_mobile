import './App.css';
import DataContainer from './components/DataContainer';
import MyForm from './components/MyForm';
import { DbProvider } from './provider/Provider';

function App() {
  return (
    <div className="App">
      <DbProvider>
        <MyForm/>
        <DataContainer/>
      </DbProvider>
    </div>
  );
}

export default App;
