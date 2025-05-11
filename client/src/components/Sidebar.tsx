import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Tooltip,
  Box,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShowChart as ChartIcon,
  TableChart as TableIcon,
  Warning as AlertIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 64;

const menuItems = [
  { icon: <DashboardIcon />, tooltip: '仪表板', path: '/' },
  { icon: <ChartIcon />, tooltip: '图表', path: '/chart' },
  { icon: <TableIcon />, tooltip: '数据表', path: '/table' },
  { icon: <AlertIcon />, tooltip: '告警', path: '/alerts' },
];

const bottomMenuItems = [
  { icon: <SettingsIcon />, tooltip: '设置', path: '/settings' },
  { icon: <InfoIcon />, tooltip: '关于', path: '/about' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ overflow: 'hidden', mt: 8, flex: 1 }}>
        <List>
          {menuItems.map((item) => (
            <Tooltip
              key={item.path}
              title={item.tooltip}
              placement="right"
              arrow
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5,
                    backgroundColor: location.pathname === item.path ? 'action.selected' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
      <Box>
        <Divider />
        <List>
          {bottomMenuItems.map((item) => (
            <Tooltip
              key={item.path}
              title={item.tooltip}
              placement="right"
              arrow
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5,
                    backgroundColor: location.pathname === item.path ? 'action.selected' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 