import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CrudForm from '../../components/crud/Form';

import { get } from '../../actions/crud';

class CrudEdit extends Component {

    componentDidMount () {
        const { model, id, get } = this.props;

        get(id, model);
    }

    componentWillMount () {
        const { model, id } = this.props;

        this.Form = connect(
            ({ crudModels }) => {
                if (crudModels[model] && crudModels[model][id])
                    return {
                        initialValues : crudModels[model][id]
                    };

                return {
                    initialValues : {}
                };
            }
        )(reduxForm({
                form: 'crud-edit',
                destroyOnUnmount: true,
                enableReinitialize: true
        })(CrudForm));
    }

    render () {
        const Form = this.Form;

        return <Form {...this.props} />;
    }
}

CrudEdit.propTypes = {
    id : PropTypes.number.isRequired,
    model : PropTypes.string.isRequired
};

export default connect(null, { get })(CrudEdit);