import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from '../iconify';

export default function AddUserModal() {
	const [open, setOpen] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handlePasswordToggle = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div>
			<Button variant="contained" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
				Ajouter
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Créer un utilisateur</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Etes-vous sûr de vouloir créer un utilisateur?
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
						label="Mot de passe"
						type={showPassword ? 'text' : 'password'}
						fullWidth
						variant="standard"
						InputProps={{
							endAdornment: (
								<Iconify
									icon={showPassword ? ' eva:eye-outline' : 'eva:eye-off-outline'}
									onClick={handlePasswordToggle}
									style={{ cursor: 'pointer' }}
								/>
							),
						}}
					/>
					<TextField
						autoFocus
						margin="dense"
						label="Confirmer votre mot de passe"
						type={showPassword ? 'text' : 'password'}
						fullWidth
						variant="standard"
						InputProps={{
							endAdornment: (
								<Iconify
									icon={showPassword ? ' eva:eye-outline' : 'eva:eye-off-outline'}
									onClick={handlePasswordToggle}
									style={{ cursor: 'pointer' }}
								/>
							),
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Annuler</Button>
					<Button onClick={handleClose}>Enregistrer</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
