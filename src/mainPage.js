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
        width: '100%',
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
    },
    input: {
        display: 'none',
    },
    ButtonDiv:{
        textAlign: 'center',
    },
    [theme.breakpoints.down('sm')]: {
        logo:{
            width:'80%',
            height:'80%',
        }
      },

});

class OutlinedTextFields extends React.Component {
    state = {
        inputValue: '',
        urls: [],
        xml: '',
    };

    updateInputValue = event => {
        this.setState({
            inputValue: event.target.value,
        });
    };

    ToXml = () => {

        const inputValue = this.state.inputValue;

        const rows = inputValue.split('\n');
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
            {body}
        </urlset>
        `;
        let urlList = [];
        for (let i = 0; i < rows.length - 1; i++) {
            let row = rows[i];
            console.log(i, row);
            let splitted = row.split('#');
            urlList.push(`<url>
            <loc>${splitted[0]}</loc>
                <changefreq>${splitted[1]}</changefreq></url>`)
        }

        let body = urlList.join('\n');
        xml = xml.replace('{body}', body);
        console.log(xml);
        this.setState({
            xml: xml
        })

    }


    render() {

        const { classes } = this.props;

        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={8}>
                <Grid container className={classes.root} spacing={16}>
                        <Grid item  className={classes.ButtonDiv} xs={12}>
                            <img className={classes.logo} src={require('./dominoslogo.png')} />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={12}>
                            <form className={classes.container} noValidate autoComplete="off">
                                <TextField
                                    id="INPUTLIST"
                                    label="INPUTLIST"
                                    placeholder="INPUTLIST"
                                    multiline
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.inputValue}
                                    onChange={this.updateInputValue}
                                    rows={20}
                                />
                            </form>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.ButtonDiv} spacing={16}>
                        <Grid item xs={12} className={classes.ButtonDiv}>
                            <Button variant="contained" onClick={this.ToXml} color="primary" className={classes.button}>
                                To XML
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <form className={classes.container} noValidate autoComplete="off">
                                <TextField
                                    id="xml"
                                    label="XML"
                                    placeholder=""
                                    multiline
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.xml}
                                    rows={20}
                                />
                            </form>
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