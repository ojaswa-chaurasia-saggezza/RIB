import './App.css';

import './Dashboard/Dashboard';
import Login from './Login Signup/Login';
import SignUp from './Login Signup/SignUp';
import Dashboard from './Dashboard/Dashboard';
import ResetPassword from '../Containers/Login Signup/ResetPassword';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/SignUp' component={SignUp} />
          <Route path='/ResetPassword' component={ResetPassword} />
          <Route path='/Dashboard' component={Dashboard} />

        </Switch>
      </Router>

    </div>
  );
}
export default App;
