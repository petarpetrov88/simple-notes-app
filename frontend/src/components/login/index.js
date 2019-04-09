import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LoginSignup from '../../containers/forms/LoginSignup'
import { login } from '../../actions/auth';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    signup: {
        marginTop: theme.spacing.unit,
    }
});

class Login extends Component {

    render() {
        const { classes, authenticated } = this.props;

        if (authenticated)
            return <Redirect to="/" />;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <LoginSignup onSubmit={login} buttonLabel='Sign in' />
                    <Button
                        to="/signup"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        component={Link}
                        className={classes.signup}
                    >
                        Sign up
                    </Button>
                </Paper>
            </main>
        );
    }

}

export default withStyles(styles)(Login);