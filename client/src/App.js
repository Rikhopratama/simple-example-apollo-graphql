import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar';
import List from './pages/List';
import Add from './pages/Add';
import SubscribeNewProduct from './pages/SubscribeNewProduct';
import UploadFile from './pages/UploadFile';

function App() {
  return (
    <Router>
      <NavBar />
      <div className='container'>
        <Switch>
          <Route path='/list'>
            <List />
          </Route>
          <Route path='/add'>
            <Add />
          </Route>
          <Route path='/subscribe_product'>
            <SubscribeNewProduct />
          </Route>
          <Route path='/upload_file'>
            <UploadFile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
