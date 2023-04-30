import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from '../iconify';

export default function EditUserModal() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button variant="text" onClick={handleClickOpen}>
				<Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
				Modifier
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Modifier</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Etes-vous sûr de vouloir modifier les informations de l'utilisateur?
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						label="Prénom"
						type="text"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Nom"
						type="text"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Adresse email"
						type="email"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Rôle"
						type="text"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Enregistrer</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}