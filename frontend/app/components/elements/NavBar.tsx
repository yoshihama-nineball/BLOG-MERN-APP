'use client'
import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import { Avatar, Box, Tab, Tabs } from '@mui/material'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

const PublicNavbar = () => {
  const [value, setValue] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setDrawerOpen(open)
    }

  return (
    <>
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        style={{ margin: 0, padding: 0, boxShadow: '0 4px 2px -2px lightgray' }} // 下部に影を追加
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab component={Link} href="/" label="Home" {...a11yProps(0)} />
              <Tab
                component={Link}
                href="/posts/create"
                label="最新"
                {...a11yProps(1)}
              />
              <Tab
                component={Link}
                href="/posts"
                label="ランキング"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <IconButton color="inherit" aria-label="search">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="notifications">
              <NotificationsIcon />
            </IconButton>
            <Avatar {...stringAvatar('Kent Dodds')} />
            <Button
              component={Link}
              href="/posts/create"
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
            >
              投稿する
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem component={Link} href="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem component={Link} href="/posts">
              <ListItemText primary="最新" />
            </ListItem>
            <ListItem component={Link} href="/ranking">
              <ListItemText primary="ユーザランキング" />
            </ListItem>
            <ListItem component={Link} href="/pricing">
              <ListItemText primary="価格" />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
    </>
  )
}

export default PublicNavbar
