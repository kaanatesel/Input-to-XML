import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyTextField from './components/MyTextField'
import DownloadBtn from './components/downloadButton'

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
    ButtonDiv: {
        textAlign: 'center',
    },
    [theme.breakpoints.down('sm')]: {
        logo: {
            width: '80%',
            height: '80%',
        }
    },
    CopiedAlert: {
        color: 'red'
    }

});

class OutlinedTextFields extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            urls: [],
            xml: '',
            disabled: true,
            copySuccess: '',
        }
        this.myxml = React.createRef()
    }


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
            let splitted = row.split('#');
            urlList.push(`<url>
            <loc>${splitted[0]}</loc>
                <changefreq>${splitted[1]}</changefreq></url>`)
        }

        let body = urlList.join('\n');
        xml = xml.replace('{body}', body);

        this.setState({
            xml: xml,
            disabled: false,
        })
    }

    ToCopy = () => {
        console.log(this.myxml)
        this.myxml.current.select();
        document.execCommand("copy");

        this.setState({
            copySuccess: 'Copied !',
        })
    }

    forDownload = () => {
        const xml = this.myxml.current.value

        const element = xml
        let blob = new Blob([element], { type: 'plain/text' })
        let url = URL.createObjectURL(blob);

        let a = document.createElement("a")
        a.href = url;
        a.download = 'xml.txt';
        a.click();
        window.URL.revokeObjectURL(url);

    }

    render() {

        const { classes } = this.props;
        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={8}>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item className={classes.ButtonDiv} xs={12}>
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
                            <Button variant="contained"
                                disabled={this.state.disabled}
                                color="primary"
                                onClick={this.ToCopy}
                                className={classes.button}>
                                Copy to clipboard
                            </Button>
                            <DownloadBtn
                                disabled={false}
                                onClick={this.forDownload}
                            >
                                download
                            </DownloadBtn>
                            <Typography variant="h6" className={classes.CopiedAlert} gutterBottom>
                                {this.state.copySuccess}
                            </Typography>

                        </Grid>
                        <Grid item xs={12}>
                            <form className={classes.container} onSelect={this.copied} noValidate autoComplete="off">
                                <TextField
                                    id="xml"
                                    ref={this.myxml}
                                    className={classes.textField}
                                    multiline
                                    label="XML"
                                    placeholder="XML"
                                    onChange={(e) => this.setState({ xml: e.target.value })}
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