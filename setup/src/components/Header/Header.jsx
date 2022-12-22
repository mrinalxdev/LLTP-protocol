import React from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, Box, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './style'

const Header = () => {
    
    const classes = useStyles()


  return (
    <div>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
            <Typography variant='h5' className={classes.title}>
                TravelHub
            </Typography>
            <Box display='flex'>
                <Typography variant='h6' className={classes.title}>
                    Lets travel the world
                </Typography>

                {/* <Autocomplete> */}
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder='Search..' classes={{root: classes.inputRoot, input: classes.inputInput}}/>
                    </div>
                {/* </Autocomplete> */}
            </Box>
        </Toolbar>
      </AppBar> 
    </div>
  )
}

export default Header
