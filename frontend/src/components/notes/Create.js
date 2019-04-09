import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CrudForm from './../../containers/forms/CrudCreate';
import { notes } from '../../constants/formFields';

import { create } from './../../actions/crud';

const styles = theme => {
    return {
        root: {
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
        submit: {
            marginTop: theme.spacing.unit * 3,
        }
    };
};

let NoteCreate = ({ classes, authenticated, history }) => {

    if (!authenticated)
        return <Redirect to='/login' />

    const onSubmit = (data, dispatch) => {
        return create('notes', data, dispatch).then(() => {
            history.push('/')
        });
    };

    return (
        <main className={classes.root} >
            <Typography component="h1" variant="h5">
                Note create
            </Typography>
            <CrudForm model='notes' fields={notes} onSubmit={onSubmit} />
            <Button
                onClick={history.goBack}
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
            >
                Cancel
            </Button>
        </main>
    );
};

NoteCreate = withStyles(styles)(NoteCreate);

export default withRouter(NoteCreate);