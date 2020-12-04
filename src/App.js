import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Books from './components/Books/Books';
import RequestBook from './components/RequestBook/RequestBook';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Dashboard from './components/Dashboard/Dashboard';
import LibrarianRoute from './components/PrivateRoutes/LibrarianRoute';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container py-5">
        <Switch>
          <Route exact path="/" component={Books} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />

          <PrivateRoute path="/book/request/:_id">
            <RequestBook />
          </PrivateRoute>

          {/* only for librarian */}
          <LibrarianRoute path="/librarian/dashboard">
            <Dashboard />
          </LibrarianRoute>

          <Route to="*" component={NotFound} />
        </Switch>
      </div>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
