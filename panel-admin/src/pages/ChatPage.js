import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Avatar, Table, TableBody, Button, TableCell, TableContainer, TableHead, TablePagination, TableRow, Container, Stack, Typography } from '@mui/material';
import { BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
import AddPostModal from '../components/modal/AddPostModal';
import useAuth from '../hooks/useAuth';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

export default function ChatPage() {
  const { messages, handlePosts } = useAuth();

  useEffect(() => {
    handlePosts();
  }, [handlePosts]);

  return (
    <>
      <Helmet>
        <title> Dashboard: Chat | TissApp </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chat
          </Typography>
          <AddPostModal />
        </Stack>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>
        <MessageTable messages={messages} />
      </Container>
    </>
  );
}

function MessageTable({ messages }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Nom & prenom</TableCell>
            <TableCell>Messages envoyés</TableCell>
            <TableCell>Date d'envoie</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell><Avatar src={message.imageUrl} alt={message.User.firstName} /></TableCell>
              <TableCell>{message.User.firstName} {message.User.lastName}</TableCell>
              <TableCell>
                {message.content}
                <img src={message.imageUrl} alt="message" style={{ width: '50px', height: '50px', marginLeft: '10px' }} />
              </TableCell>

              <TableCell>{message.createdAt}</TableCell>
              <TableCell>
                <Button>Suppimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
