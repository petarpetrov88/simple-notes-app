import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CrudForm from './../../containers/forms/CrudEdit';
import { notes } from '../../constants/formFields';

import { update } from './../../actions/crud';

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

let NoteEdit = ({ classes, authenticated, history, match : { params : { id } } }) => {

    if (!authenticated)
        return <Redirect to='/login' />

    const onSubmit = (data, dispatch) => {
        return update(id, 'notes', data, dispatch).then(() => {
            history.push('/')
        });
    };

    return (
        <main className={classes.root} >
            <Typography component="h1" variant="h5">
                Note create
            </Typography>
            <CrudForm model='notes' id={parseInt(id, 10)} fields={notes} onSubmit={onSubmit} />
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

NoteEdit = withStyles(styles)(NoteEdit);

export default withRouter(NoteEdit);