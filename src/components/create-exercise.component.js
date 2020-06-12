import React,{Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercises extends Component {
    constructor(props){
        super(props)
        // we need to call super when defining constructor of a subclass.
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // bindin this to each of the methods so that the this will be referring to the right thing.
        // this is to ensure the this in each of the below methods are referring to the class

        this.state = {
            username : '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // this is a react lifecycle method.
    componentDidMount(){
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length >0){
                this.setState({
                    users: response.data.map(user => user.username),
                    // the response's data is a list of user objects, so we are just grabbing the username property of each of these objects.
                    username: response.data[0].username // automatically setting username to first username

                })
            }
        })
    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value
        });
    }
    // whenever someone enters a input in a form, its gonna call this function and will set the state 
    // e.target.value - the target is the textbox,the value is the value of the textbox
    // NOTE: it doesnt replace state with just the username property. it just UPDATEs the username property. others will remain unchanged or will get altered by other functions.
    onChangeDescription(e){
        this.setState({
            description:e.target.value
        });
    }

    onChangeDuration(e){
        this.setState({
            duration:e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault()
        // this will prevent the default html form submit behavior from taking place.
        
        const exercise = {
            username:this.state.username,
            description:this.state.description,
            duration:this.state.duration,
            date:this.state.date
        }

        console.log(exercise)
        axios.post('http://localhost:5000/exercises/add', exercise)
        .then(res => console.log(res.data));
   

        window.location = '/';
        // this takes the person back the homepage , whr the list of exercises are displayed.
    
    }

// we are creating a dropdown menu consisting each of the usernames
    render(){
        return(
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>

        )
    }
}