import React from 'react';

import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    loaderMain: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '98vh'
    }
};

const Loading = ({ classes }) => {

    return (
        <main className={classes.loaderMain}>
            <CircularProgress size={100} />
        </main>
    );
};

export default withStyles(styles)(Loading);