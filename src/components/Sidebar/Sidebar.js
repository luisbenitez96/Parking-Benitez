import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'

import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks.js'

import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle.js'

const useStyles = makeStyles(styles)

export default function Sidebar(props) {
  const classes = useStyles()

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false
  }
  const { color, routes } = props
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = ' '
        var listItemClasses = classNames({
          [' ' + classes[color]]: activeRoute(prop.layout + prop.path)
        })
        const whiteFontClasses = classNames({
          [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        })
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName='active'
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === 'string' ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                />
              )}
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        )
      })}
    </List>
  )
  return (
    <div>
      <Hidden mdUp implementation='css'>
        <Drawer
          variant='temporary'
          anchor='right'
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer
          anchor='left'
          variant='permanent'
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          <div className={classes.sidebarWrapper}>{links}</div>
        </Drawer>
      </Hidden>
    </div>
  )
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
}
