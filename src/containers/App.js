import React from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import SearchBox from "../components/SearchBox";
import ErrorBoundery from "../components/ErrorBounderies";
import { setSearchField, requestRobots } from "../actions";
import "./App.css";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    OnRequestRobots: () => dispatch(requestRobots()),
  };
};

class App extends React.Component {
  componentDidMount() {
    this.props.OnRequestRobots();
  }

  render() {
    const { searchField, OnSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return isPending ? (
      <h1>Loading ...</h1>
    ) : (
      <div className="tc">
        <div id="header">
          <h1 className="f1"> RoboFriends </h1>
          <SearchBox searchChange={OnSearchChange} />
        </div>

        <Scroll>
          <ErrorBoundery>
            <CardList robots={filteredRobots} />
          </ErrorBoundery>
        </Scroll>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
