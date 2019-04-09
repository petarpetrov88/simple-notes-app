import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default (ComposedComponent) => {
    class Authentication extends Component {

        componentWillMount() {
            const { history, auth : { authenticated } } = this.props;

            if (!authenticated)
                history.push('/login');
        }

        componentWillUpdate(nextProps) {
            const { history } = this.props;
            const { auth : { authenticated } } = nextProps;

            if (!authenticated)
                history.push('/login');
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps({auth}) {
        return {
            auth: auth
        };
    }

    return withRouter(connect(mapStateToProps)(Authentication));
}