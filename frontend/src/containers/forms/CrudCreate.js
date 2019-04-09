import React from 'react'
import { reduxForm } from 'redux-form'
import Form from '../../components/crud/Form';

const CrudCreate = (props) => {
    return <Form {...props} />
};

export default reduxForm({
    form: 'crud-create',
    destroyOnUnmount: true,
    enableReinitialize: true
})(CrudCreate);