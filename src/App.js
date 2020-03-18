import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { About } from './components/pages/About'; //{} used when no export default is in Component file
import './App.css';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';

class App extends Component {
  state = {
    loading: false,
    user: {},
    users: [],
    alert: null,
    repos: []
  };
  async componentDidMount() {
    this.setState({ loading: true });
    await fetch(
      `https://api.github.com/users?since=135&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    )
      .then(res => res.json())
      .then(data => this.setState({ users: data, loading: false }))
      .catch(err => console.log(err));
  }

  searchUsers = async text => {
    this.setState({ loading: true });
    await fetch(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    )
      .then(res => res.json())
      .then(data => this.setState({ users: data.items, loading: false }))
      .catch(err => console.log(err));
  };

  getUser = async (username) => {
    this.setState({ loading: true });

    await fetch(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    )
      .then(res => res.json())
      .then(data => this.setState({ user: data, loading: false }))
      .catch(err => console.log(err));

  }

  getUserRepos = async (username) => {
    this.setState({ loading: true });

    await fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    )
      .then(res => res.json())
      .then(data => this.setState({ repos: data, loading: false }))
      .catch(err => console.log(err));

  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  }
  render() {
    const { users, loading, alert, user, repos } = this.state;
    return (
      <Router>
        <div className="app">
          <Navbar title="Github Finder" icon="fa fa-github" />
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <div className="container">
                  <Alert alert={alert} />
                  <Search searchUsers={this.searchUsers}
                    setAlert={this.setAlert} />
                  <Users loading={loading} users={users} />
                </div>
              </Fragment>
            )} />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={props => (
              <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading} />
            )} />
          </Switch>
        </div >
      </Router>
    );
  }
}

export default App;
