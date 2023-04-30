import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  Container, Stack, Typography } from '@mui/material';
import { BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
import AddPostModal from '../components/modal/AddPostModal';


const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

const messages = [
  { id: 1, user: { name: 'John Doe', avatar: 'https://picsum.photos/seed/picsum/50/50' }, text: 'Lorem ipsum dolor sit amet.', date: '2022-05-01' },
  { id: 2, user: { name: 'Jane Doe', avatar: 'https://picsum.photos/seed/picsum/50/50' }, text: 'Consectetur adipiscing elit.', date: '2022-05-02' },
  { id: 3, user: { name: 'Alice Smith', avatar: 'https://picsum.photos/seed/picsum/50/50' }, text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '2022-05-03' },
];

export default function ChatPage() {
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
          <AddPostModal/>
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
            <TableCell>Message envoyé</TableCell>
            <TableCell>Date d'envoie</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell><Avatar src={message.user.avatar} alt={message.user.name} /></TableCell>
              <TableCell>{message.user.name}</TableCell>
              <TableCell>{message.text}</TableCell>
              <TableCell>{message.date}</TableCell>
              <TableCell>Suppimer</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
