import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from '../iconify';

export default function AddPostModal() {
	const [open, setOpen] = React.useState(false);
	// const [showPassword, setShowPassword] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// const handlePasswordToggle = () => {
	// 	setShowPassword(!showPassword);
	// };

	return (
		<div>
			<Button variant="contained" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
				Message
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div>Message</div>
					<Iconify onClick={handleClose} icon="eva:close-fill" color="gray" cursor="pointer"/>
				</DialogTitle>
				<DialogContent>
					<TextField
						id="filled-multiline-static"
						label="Message"
						multiline
						rows={4}
						variant="filled"
					/>
				</DialogContent>
				<DialogActions>
					<div style={{ marginRight: 'auto' }}>
						<Button variant="text" component="label">
							Télécharger
							<input hidden accept="image/*" multiple type="file" />
						</Button>
					</div>
					<div style={{ marginLeft: 'auto' }}>
						<Button onClick={handleClose}>Envoyer</Button>
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
}
