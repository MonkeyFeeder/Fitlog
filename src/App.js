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
import WorkoutLog from './components/workout-log/workout-log.component';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container>
          <Switch>
            <Route exact path="/Fitlog">
              <CreateWorkoutLog />
            </Route>
            <Route exact path={`/Fitlog/:id`}>
              <WorkoutLog  />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
