import { useState, useEffect } from 'react';
import { Avatar, Button, Container, Grid, TextField, Typography } from '@mui/material';
import useAuth from "../hooks/useAuth";

function AccountPage() {
	const [imageLoaded, setImageLoaded] = useState(false);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	const handleImageError = () => {
		setImageLoaded(false);
	};
	
	const {
		user,
		setUser,
		firstName,
		lastName,
		email,
		imageUrl,
		handleUser,
	} = useAuth();

	useEffect(() => {
		handleUser()
	}, [handleUser]);

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
					<Avatar
						src={imageUrl || null}
						alt={`${firstName} ${lastName}`}
						onLoad={handleImageLoad}
						onError={handleImageError}
						sx={{ width: 80, height: 80 }}
					>
						{!imageLoaded && `${firstName.charAt(0)}${lastName.charAt(0)}`}
					</Avatar>
				</Grid>

				<Grid item>
					<Typography variant="h4" gutterBottom>
						{editing ? (
							<TextField name="firstName" value={editedUser.firstName} onChange={handleInputChange} />
						) : (
							`${firstName} ${lastName}`
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
						{email}
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
