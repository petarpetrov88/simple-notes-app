import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import {connect} from 'react-redux';

import Notes from './../components/notes';
import NotesCreate from './../components/notes/Create'
import NotesEdit from './../components/notes/Edit'
import Login from './../components/login';
import Signup from './../components/signup'
import Loading from './../components/loading'
import Message from '../components/app/Message'

import Session from './../utils/Session'

import { authenticate } from '../actions/auth';
import { dismissMessage } from '../actions/app';

class App extends Component {

    componentDidMount () {
        const { auth : { authenticated }, authenticate } = this.props;
        const jwt = Session.get('jwt');

        if (jwt && !authenticated)
            authenticate();
    }

    handleMessageClose = () => {
        const { dismissMessage } = this.props;

        dismissMessage();
    };

    render() {
        const { auth : { authenticated }, data : { loading, message } } = this.props;
        const jwt = Session.get('jwt');

        if (loading || (jwt && !authenticated))
            return <Loading />;

        return (
            <>
                {message && <Message message={message} handleMessageClose={this.handleMessageClose} /> }
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render={() => <Notes authenticated={authenticated} />} />
                        <Route exact path="/notes/create" render={() => <NotesCreate authenticated={authenticated} />} />
                        <Route exact path="/notes/edit/:id" render={() => <NotesEdit authenticated={authenticated} />} />
                        <Route exact path="/login" render={() => <Login authenticated={authenticated} />} />
                        <Route exact path="/signup" render={() => <Signup authenticated={authenticated} />} />
                    </Switch>
                </BrowserRouter>
            </>
        );
    }

}

function mapStateToProps({ auth, app }) {
  return {
      data : app,
      auth : auth
  };
}

export default connect(mapStateToProps, { authenticate, dismissMessage })(App);
