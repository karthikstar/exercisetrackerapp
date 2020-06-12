import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// exercise component - implemented as a functional react component.
const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )

  //class component 
  // diff btwn functional and class component - lack of state and lifecycle hooks. 

export default class ExercisesList extends Component {
    constructor(props){
        super(props);


        this.deleteExercise = this.deleteExercise.bind(this)
        this.state = {exercises : []};       
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
        .then(response => {
            this.setState({exercises:response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }
// this will run before the page is rendered ^ 

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(res => console.log(res.data));
        
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
            // every element in the exercises array, if its id does not equal the id passed for deleting, then it will be shown.
        })
    }
// the id in the database is _id.

// for every elermnt called currentexercise, it will return a component called Exercise, which is basically a row of a table. 
    exerciseList() {
        return this.state.exercises.map(currentexercise => {
        return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
     })
  }
    render(){
        return(
    <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
    </div>
        )
    }
}