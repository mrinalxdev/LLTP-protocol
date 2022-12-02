import React from 'react'
import { Autocomplete} from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './style'


export const Header = () => {
  const classes = useStyles()

  return (
    <>
        <AppBar position='static'>
          <Toolbar >
            <Typography variant = 'h4'>
              Travel Space
            </Typography>

            <Autocomplete>
              <div className = {classes.search}>
                 <div className= {classes.searchIcon}>
                  <SearchIcon />
                 </div>
                 <InputBase placeholder='Search ...' classes = {{root : classes.inputRoot, input : classes.inputInput}}/>
              </div>
            </Autocomplete>
          </Toolbar>
        </AppBar>
    
    </>
  )
}
