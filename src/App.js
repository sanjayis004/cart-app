import './App.css';
import Login  from './components/Login'; 
import ProductDetails from './components/ProductDetails'
import Cart  from './components/Cart';
import Products  from './components/Products';

import  {  BrowserRouter as Router  , Route, Routes } from 'react-router-dom'

function App(props) {
  const { history } = props;
  
  return (
      <Router history={history}>
        <Routes>
        <Route path="/login"  Component={Login}/>
        <Route path="/products" Component={Products} />
        <Route path="/product/:id" Component={ProductDetails} />
        <Route path="/cart" Component={Cart} />
        </Routes>
        </Router>
   
  );
}

export default App;
