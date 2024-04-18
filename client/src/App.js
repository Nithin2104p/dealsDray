
import './App.css';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Form from './components/Form';
import AddPosts from './components/User/AddPosts';
import EditPost from './components/User/EditPost';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import React from 'react';
import Main from './components/User/Main';
function App() {
  return (
    <div className="container" >
      <Navbar />
      <Switch>
        <Route exact path="/posts/edit">
          <EditPost />
        </Route>
        <Route exact path="/posts/create">
          <AddPosts />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/register">
          <Form register={true} />
        </Route>
        <Route exact path="/login">
          <Form register={false} />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/not-found">
          <NotFound />
        </Route>
        <Redirect to="/not-found" />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
