import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import { renderInputField } from '../../components/elements/Input';

const styles = theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

let LoginSignup = ({classes, handleSubmit, submitting, buttonLabel}) => {
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Field name="email" component={renderInputField} type="email" label='Email' required />
            <Field name="password" component={renderInputField} type="password" label='Password' autoComplete="current-password" required />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={submitting}
            >
                {buttonLabel}
            </Button>
        </form>
    );
}

LoginSignup.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string.isRequired
};

LoginSignup = reduxForm({
    form: 'loginSignup',
    destroyOnUnmount: false,
    enableReinitialize: true
})(LoginSignup)

export default withStyles(styles)(LoginSignup);