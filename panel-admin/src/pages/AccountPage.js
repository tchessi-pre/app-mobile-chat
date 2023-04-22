import { useState } from 'react';
import { Avatar, Button, Container, Grid, TextField, Typography } from '@mui/material';

function AccountPage() {
	const [user, setUser] = useState({
		firstName: 'John',
		lastName: 'Doe',
		email: 'johndoe@example.com',
		avatarUrl: 'https://picsum.photos/200',
	});
	const [editing, setEditing] = useState(false);
	const [editedUser, setEditedUser] = useState(user);

	const handleEditClick = () => {
		setEditing(true);
		setEditedUser(user);
	};

	const handleSaveClick = () => {
		setUser(editedUser);
		setEditing(false);
	};

	const handleCancelClick = () => {
		setEditing(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name !== 'email') {
			setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
		}
	};

	return (
		<Container maxWidth="sm">
			<Grid container spacing={3} alignItems="center">
				<Grid item>
					<Avatar src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} sx={{ width: 80, height: 80 }} />
				</Grid>
				<Grid item>
					<Typography variant="h4" gutterBottom>
						{editing ? (
							<TextField name="firstName" value={editedUser.firstName} onChange={handleInputChange} />
						) : (
							`${user.firstName} ${user.lastName}`
						)}
					</Typography>
					<Typography variant="h4" gutterBottom>
						{editing ? (
							<TextField name="lastName" value={editedUser.lastName} onChange={handleInputChange} />
						) : (
							''
						)}
					</Typography>
					<Typography variant="body1" gutterBottom>
						{user.email}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					{editing ? (
						<>
							<Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={handleSaveClick}>
								Enregistrer
							</Button>
							<Button variant="contained" onClick={handleCancelClick}>
								Annuler
							</Button>
						</>
					) : (
						<Button variant="contained" onClick={handleEditClick}>
							Modifier
						</Button>
					)}
				</Grid>
			</Grid>
		</Container>
	);
}

export default AccountPage;
