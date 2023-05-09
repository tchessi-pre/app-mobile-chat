import React, { useState } from 'react';

// Components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

// Hooks
import usePost from '../../hooks/usePost';


const Transition = React.forwardRef((props, ref) => (
	<Slide direction="up" ref={ref} {...props} />
));

export default function DeleteModal(PostId) {
	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const { deletePost } = usePost();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = async () => {
		try {
			await deletePost(PostId); 
			handleClose();
		} catch (error) {
			setErrorMessage('Une erreur s\'est produite lors de la suppression du message.');
		}
	};

	return (
		<div>
			<Button variant="text" onClick={handleClickOpen}>
				Supprimer
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
			>
				<DialogTitle>{"Supprimer un message"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Etes-vous sûr de vouloir supprimer?
					</DialogContentText>
				</DialogContent>
				{
					errorMessage && (
						<Alert severity="error" onClose={() => setErrorMessage(null)}>
							{errorMessage}
						</Alert>
					)
				}
				<DialogActions>
					<Button onClick={handleClose}>Annuler</Button>
					<Button onClick={handleDelete}>Supprimer</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
