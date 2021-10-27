import Header from './components/Header';
import ProductList from './components/ProductList';
import SubtotalContext from 'context/SubtotalContext';

function App() {
  return (
    <SubtotalContext>
      <Header />
      <ProductList />
    </SubtotalContext>
  );
}

export default App;
