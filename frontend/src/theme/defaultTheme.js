import { createTheme, responsiveFontSizes } from "@material-ui/core";



/*
  Colors: Void - #0E0B16
       Fuschia - #A239CA
        Jewel  - #4717F6
        Stark  - #E7DFDD
*/

const c_void = "#0E0B16"
const c_fuschia = "#A239CA"
const c_jewel = "#4717F6"
const c_stark = "#E7DFDD"
const c_paper = "#181818"

const c_blackblue = "#0C0323"
const c_primary = "rgb(47, 58, 212)"
const c_secondary = "#C01B74"

let theme = createTheme({
    typography: {
        // fontFamily: ['Dosis'],
        // body1: {fontSize: "1.2rem"},
        // body2: {fontSize: "1rem"},
        // button: {fontSize: "1rem"},
        // caption: {fontSize: "0.9rem"}
    },
    palette: {
        type: 'dark',
        text: {
            primary: c_stark,
        },
        primary: {
            main: c_primary
        },
        secondary: {
            main: c_secondary
        },
        error: {
            main: '#cf6679',
        },
        background: {
            default: c_blackblue,
            paper: c_paper,
        },
    },
});

theme = responsiveFontSizes(theme, {factor: 1.15})
export default theme