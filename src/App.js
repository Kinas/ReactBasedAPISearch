import React from 'react';
import './index.css';
//import the table-strucutre from index
import App from './index.js'



class GitForm extends React.Component {
  //constructs the state of the class
  constructor(props) {
    super(props);
    this.state = {
      repoName: '',
      ownerName: '',
      query: '',
      results: []
  };
    this.handleRepoChange = this.handleRepoChange.bind(this);
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }
  //get data from gtiHub API
  getInfo() {
    var data=[];
    fetch('https://api.github.com/repos/'+ this.state.query[1] + '/'+ this.state.query[0] +'/issues\?state\=all')
    .then((response) => response.json())
    .then((responseJson) => {
      responseJson.forEach(id => {
        data.push({
          number: id.number,
            title: id.title,
            date: id.created_at
        });
      })
    })
    .then(() => {
      //after data is fetched change the state so React can react and update the table
      this.setState({results: data})
    })
    .catch((error) => {
      console.error(error);
    });  
  }
  //input handler
  handleRepoChange(event) {
    this.setState({repoName: event.target.value});
  }
   handleOwnerChange(event) {
    this.setState({ownerName: event.target.value});
  }
  //submit handler
  handleSubmit(event) {
    //after submitting repo and owner name update the state and fetch the data
    this.setState({
      query: [this.state.repoName, this.state.ownerName]
    }, () => {
            this.getInfo()
    });
    event.preventDefault();
  }
  //render the form
  render() {
    return (
      <div className="React-form">
        <div className="topnav">
            <input type="text" name="repoName"  placeholder="Repository" onChange={this.handleRepoChange} />
            <input type="text" name="ownerName" placeholder="Owner" onChange={this.handleOwnerChange} />
            <img src="search.png" onClick={this.handleSubmit} alt="submit"/>
        </div>
      <span id="table-container">
          <App changeSets={this.state.results} />
      </span>
    </div>
    );
  }
}

export default GitForm
