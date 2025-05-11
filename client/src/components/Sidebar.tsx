import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Tooltip,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Timeline as TimelineIcon,
  TableChart as TableIcon,
  Warning as AlertIcon,
  Settings as SettingsIcon,
  Assessment as AnalysisIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 64;

const menuItems = [
  { icon: <DashboardIcon />, tooltip: '仪表板', path: '/' },
  { icon: <TimelineIcon />, tooltip: '实时图表', path: '/chart' },
  { icon: <TableIcon />, tooltip: '数据表格', path: '/table' },
  { icon: <AlertIcon />, tooltip: '告警面板', path: '/alerts' },
  { icon: <AnalysisIcon />, tooltip: '数据分析', path: '/analysis' },
  { icon: <SettingsIcon />, tooltip: '系统设置', path: '/settings' },
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
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box sx={{ overflow: 'hidden', mt: 8 }}>
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
                  selected={location.pathname === item.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5,
                    '&.Mui-selected': {
                      backgroundColor: 'action.selected',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      color: location.pathname === item.path ? 'primary.main' : 'inherit',
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