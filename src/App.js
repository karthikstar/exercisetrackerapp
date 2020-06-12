import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

//importing some components.
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";


// creating router element
function App() {
  return (
    // tbheres a router element for each route of the application
   // we can see that theres a route element for each route in the application. 
   // path attribute is set to the url path.
   // if we go to the route url w a slash at the end will go the ex list component
   // if we go to the route url w edit/:id we will go to the edit exercise component
   <Router>
     <div className = "container color">
        <Navbar />
        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>

  );
}

export default App;
