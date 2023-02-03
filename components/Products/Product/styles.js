// styling the components - this is how styling works with material ui

import { makeStyles } from "@material-ui/core/styles";


export default makeStyles(() => ({
    root: {
        waxwidth: "100%"
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));