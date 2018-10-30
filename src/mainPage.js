import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '400px',
        height: '100%',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
        marginLeft: '37%',
    },
    input: {
        display: 'none',
    },

});

//const o2x = require('object-to-xml');



class OutlinedTextFields extends React.Component {
    state = {
        name: '',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
        url: '',
        xml: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    ToXml = () => {
        const log = document.getElementById('log').value

        const splitedLines = log.split(" ")
        const splitedInput = log.split("#")

        for( let i = 0 ; i < splitedLines.length ; i++){
            for(let u = 0 ; u < splitedInput.length ; u++) {
                console.log(splitedInput[u])
              }
        }
        

            // let obj = {
            //     '?xml version="1.0" encoding="UTF-8"?': null,
            //     urlset: {
            //         '@': {
            //             xmlns: "https://www.sitemaps.org/schemas/sitemap/0.9",
            //         },
            //         '#': {
            //             url: {
            //                 loc: splitedInput[0],
            //                 changefreq: splitedInput[1],
            //             }
            //         }
            //     }
            // };

            // this.setState({
            //     xml: o2x(obj),
            // })
    }


    render() {

        const { classes } = this.props;

        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={8}>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={12}> <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="log"
                                label="log"
                                placeholder="log"
                                multiline
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.inputValue}
                                onChange={this.updateInputValue}
                            />
                            <TextField
                                id="xml"
                                label="XML"
                                placeholder=""
                                multiline
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.xml}
                                onChange={this.updateInputValue}
                            />

                        </form></Grid>
                        <Grid item xs={12} >
                            <Button variant="outlined" onClick={this.ToXml} color="primary" className={classes.button}>
                                To XML
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={2}></Grid>

            </Grid>

        )
    }

}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);