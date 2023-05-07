import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Checkbox,
  Container,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TablePagination,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditUserModal from '../components/modal/EditUserModal';
import AddUserModal from '../components/modal/AddUserModal';
import Scrollbar from '../components/scrollbar';
import useAuth from '../hooks/useAuth';

const UsersPage = () => {
  const { users, handleAllUsers } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const open = Boolean(anchorEl);

  useEffect(() => {
    handleAllUsers();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 // La fonction pour gérer le changement de page:
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // La fonction pour gérer le changement du nombre de lignes par page :
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Helmet>
        <title> Utilisateurs | TissApp </title>
      </Helmet>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Utilisateurs
        </Typography>
        <AddUserModal />
      </Stack>
      <Scrollbar>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rôle</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Créé le</TableCell>
                <TableCell>Modifié le</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                <TableRow key={user.id}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <Avatar src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
                  </TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.admin ? (
                      <span style={{ color: 'green' }}>Admin</span>
                    ) : (
                      'Utilisateur'
                    )}
                  </TableCell>

                  <TableCell>
                    {user.status === 'online' ? (
                      <span style={{ color: 'green' }}>En ligne</span>
                    ) : (
                      <span style={{ color: 'red' }}>Hors ligne</span>
                    )}
                  </TableCell>

                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>{user.updatedAt}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="plus d'options"
                      aria-controls="actions-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="actions-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleClose}
                    >
                      <EditUserModal />
                      <MenuItem onClick={handleClose}>Supprimer</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Lignes par page:"
        />
      </Scrollbar>
    </Container>
  );
};

export default UsersPage;
