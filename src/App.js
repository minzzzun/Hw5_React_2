
import './App.css';
import Router from './shared/Router';
import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Router />
      <nav className='nav'>
      <ul>
        <li>
          <Link to="list">List</Link>
        </li>
        <li>
          <Link to="create">Create</Link>
        </li>
      </ul>
      </nav>
    </BrowserRouter>
     
    </>
  );
}

export default App;
