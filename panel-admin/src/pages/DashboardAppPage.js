import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Avatar, Grid, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// sections
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import useAuth from '../hooks/useAuth';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const { users, messages, handlePosts, handleAllUsers } = useAuth();

  useEffect(() => {
    handleAllUsers();
    handlePosts();
  }, [handleAllUsers, handlePosts]);

  const onlineUsers = users.filter((user) => user.status === 'online');
  const sortedMessages = messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const lastFourMessages = sortedMessages.slice(0, 4);

  return (
    <>
      <Helmet>
        <title> Tableau | TissApp </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Salut, bienvenue à nouveau!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Nombre d'utilisateurs" total={users.length} icon={'ant-design:user-switch-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Utilisateurs en ligne" total={onlineUsers.length} color="info" icon={'ant-design:wifi-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Nombre de Chat" total={messages.length} color="warning" icon={'ant-design:wechat-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="4 derniers messages"
              total={lastFourMessages.length}
              color="error"
              icon={'ant-design:message-filled'}
            />
          </Grid>
          <Typography variant="h4" sx={{ mb: 1, ml: 4, mt: 8  }}>
            Messages récents:
          </Typography>

          <Grid item xs={12} md={12} lg={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Avatar</TableCell>
                    <TableCell>Messages</TableCell>
                    <TableCell>Envoyé le</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lastFourMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>
                        <Avatar src={message.User.imageUrl} alt={message.User.firstName} />
                      </TableCell>
                      <TableCell>{message.content}</TableCell>
                      <TableCell>{message.createdAt}</TableCell>
                      <TableCell>
                        {message.User.status === 'online' ? (
                          <span style={{ color: 'green' }}>En ligne</span>
                        ) : (
                          <span style={{ color: 'red' }}>Hors ligne</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
