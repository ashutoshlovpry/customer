import logo from './logo.svg';
import './App.css';
import CompantList from './component/index'
import Details from './component/details';
import AllCustomer from './component/allCustomer';
import EditDetails from './component/editDetails';
import UniqueCity from './component/city'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <>
     <Router>  
     <Routes>

      <Route exact path="/" element={<CompantList/>} />
      <Route exact path="customer/:id" element={<Details/>} />  
      <Route exact path="/customers" element={<AllCustomer/>} />  
      <Route exact path="/edit/:id" element={<EditDetails/>} />  
      <Route exact path="/city" element={<UniqueCity/>} />  
      </Routes>

  </Router> 
   </>
  );
}

export default App;
