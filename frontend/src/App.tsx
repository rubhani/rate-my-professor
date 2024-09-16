import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Reviews from './pages/Reviews';
import Summary from './pages/Summary';
import Layout from './general-components/Layout'
import ProfessorPage from './pages/ProfessorPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes >
          <Route path="/login" Component={Login} />
          <Route path="/reviews" Component={Reviews} />
          <Route path="/summary" Component={Summary} />
          <Route path="/professor/:id" Component={ProfessorPage} />  {/* Route for reviews of a professor */}
        </Routes >
      </Layout>
    </Router>
  );
}

export default App;
