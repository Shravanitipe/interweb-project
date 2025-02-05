import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AddProduct from './components/Admin/AddProduct';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin-login" component={AdminLogin} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/add-product" component={AddProduct} />
      </Switch>
    </Router>
  );
}

export default App;
