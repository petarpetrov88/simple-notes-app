import React, { PureComponent } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import map from 'lodash/map';

import { withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import Note from './Note';
import List from './../../containers/crud/List';
import Loading from './../loading'

import { del } from './../../actions/crud';


const styles = theme => {
    return {
        root: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        fab: {
            align: 'right',
            margin: theme.spacing.unit + 'px 0px ' + theme.spacing.unit + 'px auto',
        },
        loadMore: {
            marginTop: theme.spacing.unit * 3,
        },
        emptyWrapper : {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }
    }
};

class Notes extends PureComponent {

    handleDelete = (id) => {
        const { del } = this.props;

        del(id, 'notes');
    };

    renderEmpty = () => {
        const { classes } = this.props;

        return (
            <main className={classes.root} >
                <Fab color="primary" aria-label="Add" className={classes.fab} to='/notes/create' component={Link}>
                    <AddIcon />
                </Fab>
                <div className={classes.emptyWrapper}>
                    <Typography component="h3" variant="h5">
                        You have no notes yet. Try to add some...
                    </Typography>
                </div>
            </main>
        );
    };

    renderLoading = () => {
        return <Loading />;
    };

    renderResult = (crud) => {
        const { classes } = this.props;

        return (
            <main className={classes.root} >
                <Fab color="primary" aria-label="Add" className={classes.fab} to='/notes/create' component={Link}>
                    <AddIcon />
                </Fab>
                <Grid container>
                    {
                        map(crud.getItems(), (note, index) => <Note {...note} key={index} handleDelete={this.handleDelete} />)
                    }
                </Grid>
                {
                    crud.hasMoreResults() &&
                    <Button
                        onClick={crud.loadMore}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.loadMore}
                    >
                        Load more
                    </Button>
                }
            </main>
        );
    };

    render() {
        const { authenticated } = this.props;

        if (!authenticated)
            return <Redirect to="/login" />;

        return (
            <List
                model='notes'
                options={{'per-page' : 9}}
                resultRender={this.renderResult}
                preloadRender={this.renderLoading}
                emptyRender={this.renderEmpty}
            />
        );
    }

};

Notes = withStyles(styles)(Notes)

export default connect(null, { del })(Notes);