import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//getting the data for setting up the table
import GitForm from './App.js'

class Heading extends React.Component {
  render() {
    return <th>{this.props.heading}</th>;
  }
}

class Headings extends React.Component {
  render() {
    var headings = this.props.headings.map(function(name, i) {
      return <Heading heading = {name} key={i}/>;
    });
   return <thead><tr>{headings}</tr></thead>;
  }
}

class Row extends React.Component {
  render() {
    return (<tr>
             <td>{this.props.changeSet.number}</td>
             <td>{this.props.changeSet.title}</td>
             <td>{this.props.changeSet.date}</td>
           </tr>);
  }
}

class Rows extends React.Component {
  render() {
    for (var i=0; i<this.props.changeSets.length; i++){
    }
    var rows = this.props.changeSets.map(function(changeSet, i) {
      return(<Row changeSet = {changeSet} key={i}/>);
    });
    return <tbody>{rows}</tbody>;
  }

}

//main class: App
// creates a table with the given data
class App extends React.Component { 
  constructor(props) {
      super(props);
      this.state = {
        headings: ['Number', 'Title', 'Date of Creation']
    };
  }
        
    render() {
    return <table className = 'table'>
             <Headings headings = {this.state.headings} />
             <Rows changeSets = {this.props.changeSets} />
           </table>;
    }

}
 
export default App;


// =================================

ReactDOM.render(<GitForm />, document.getElementById('body'));



 