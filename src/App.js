import React, { useState } from 'react';
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
  const [workoutLogId, setId] = useState('');

  const handleLogCreation = (workoutId) => {
    setId(workoutId);
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Container>
          <Switch>
            <Route exact path="/">
              <CreateWorkoutLog handleLogCreation={handleLogCreation} />
            </Route>
            <Route exact path={`/:id`}>
              <WorkoutLog  />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
