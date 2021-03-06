import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';

import { Container } from 'react-bootstrap';

import Header from './components/header/header.component';
import CreateWorkoutLog from './components/create-workout-log/create-workout-log.component';
import Home from './pages/home/home.component';
import ChartPage from './pages/charts-page/charts-page.component.jsx';
import ResourcesPage from './pages/resources-page/resources-page.component';
import Footer from './components/footer/footer.component';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Container>
          <Route path={`/:id`}>
            <Header />
          </Route>
          <Switch>
            <Route exact path="/">
              <CreateWorkoutLog />
            </Route>
            <Route exact path={`/:id`}>
              <Home />
            </Route>
            <Route exact path={`/:id/charts`}>
              <ChartPage />
            </Route>
            <Route exact path={`/:id/resources`}>
              <ResourcesPage />
            </Route>
          </Switch>
          <Route path={`/:id`}>
            <Footer />
          </Route>
        </Container>
      </div>
    </Router>
  );
}

export default App;
