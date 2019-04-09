import React from 'react'
import PropTypes from 'prop-types';
import map from 'lodash/map'
import { Field } from 'redux-form'

import { renderInputField } from '../elements/Input';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

const Form = ({ classes, handleSubmit, submitting, dirty, fields }) => {
    return (
        <div>
            <form className={classes.form} onSubmit={handleSubmit}>
                {
                    map(fields, (field, index) => <Field component={renderInputField} key={index} {...field} />)
                }

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!dirty || submitting}
                >
                    Save
                </Button>
            </form>
        </div>
    );
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fields : PropTypes.arrayOf(
        PropTypes.shape({
            name : PropTypes.string.isRequired,
            type : PropTypes.oneOf(['text', 'email', 'password', 'textarea', 'select']),
            label : PropTypes.string.isRequired,
            required : PropTypes.bool.isRequired
        })
    ).isRequired
};

export default withStyles(styles)(Form);