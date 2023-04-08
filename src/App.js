import Card from './components/Card';
import Draver from './components/Draver';
import Header from './components/Header';


function App() {
  return (
    <div className="wrapper clear">
      
      <Draver />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
        <h1>Все кроссовки</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input placeholder="Поиск..." />
        </div>
        </div>
        <div className="d-flex justify-between">
        <Card />
        <Card />
        <Card />
        <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
