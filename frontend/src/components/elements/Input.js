import React from 'react'
import map from 'lodash/map';

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';


export const renderInputField = ({ input, meta: { touched, error }, type, label, required, options }) => {
    const hasError = touched && error !== undefined;
    let inputComponent = null;

    switch (type.toLowerCase()) {
        case 'text':
        case 'email':
        case 'password':
            inputComponent = (
                <>
                    <InputLabel htmlFor={input.name}>{label}</InputLabel>
                    <Input type={type} {...input} error={hasError} />
                </>
            );
            break;
        case 'select':
            const items = map(options, (item, index) => <MenuItem value={item.value} key={index}>{item.label}</MenuItem>);
            inputComponent = (
                <>
                    <InputLabel htmlFor={input.name}>{label}</InputLabel>
                    <Select {...input} error={hasError} inputProps={{ name: input.name }} required>
                        {items}
                    </Select>
                </>
            );
            break;
        case 'textarea':
            inputComponent = <TextField multiline={true} rows={4} {...input} error={hasError} label={label} required={required} />;
            break;
        default:
            inputComponent = null
    }

    return (
        <FormControl error={hasError} required={required} margin="normal" fullWidth>
            {inputComponent}
            {hasError && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}