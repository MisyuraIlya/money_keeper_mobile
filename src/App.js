import './App.css';
import DataContainer from './components/DataContainer';
import ExportData from './components/ExportData';
import MyForm from './components/MyForm';
import { DbProvider } from './provider/Provider';

function App() {
  return (
    <div className="App">
      <DbProvider>
        <MyForm/>
        <DataContainer/>
        <ExportData/>
      </DbProvider>
    </div>
  );
}

export default App;
