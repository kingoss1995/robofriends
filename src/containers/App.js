import React from "react";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import SearchBox from "../components/SearchBox";
import ErrorBoundery from "../components/ErrorBounderies";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState({
          robots: users,
        })
      );
  }

  OnSearchChange = (event) => {
    this.setState({
      searchfield: event.target.value,
    });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    return !robots.length ? (
      <h1>Loading ...</h1>
    ) : (
      <div className="tc">
        <h1 className="f1"> RoboFriends </h1>
        <SearchBox searchChange={this.OnSearchChange} />
        <Scroll>
          <ErrorBoundery>
            <CardList robots={filteredRobots} />
          </ErrorBoundery>
        </Scroll>
      </div>
    );
  }
}

export default App;
