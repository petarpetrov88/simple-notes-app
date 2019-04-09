import React from 'react';
import { Link } from 'react-router-dom';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => {
    return {
        card: {
            margin: theme.spacing.unit * 2
        },
        red: {
            backgroundColor: '#EC7063'
        },
        green: {
            backgroundColor: '#ABEBC6'
        },
        blue: {
            backgroundColor: '#AED6F1'
        }
    }
};

const NoteCard = ({ classes, id, topic, text, width, color, handleDelete }) => {

    const getGridListCols = () => {
        if (isWidthUp('lg', width))
            return 4;

        if (isWidthUp('md', width))
            return 6;

        return 12;
    };

    return (
        <Grid item xs={getGridListCols()}>
            <Card className={classes.card}>
                <CardActionArea className={classes[color]}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            { topic }
                        </Typography>
                        <Typography component="p">
                            { text }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button component={Link} to={`/notes/edit/${id}`} size="small" color="primary">
                        <EditIcon />
                        Edit
                    </Button>
                    <Button size="small" color="primary" onClick={() => handleDelete(id)}>
                        <DeleteIcon />
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default withStyles(styles)(withWidth()(NoteCard));