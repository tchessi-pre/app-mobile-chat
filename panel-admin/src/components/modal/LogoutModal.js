import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Iconify from '../iconify';

const Transition = React.forwardRef((props, ref) => (
	<Slide direction="up" ref={ref} {...props} />
));

export default function AlertDialogSlide() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<MenuItem variant="text" onClick={handleClickOpen}>
				<Iconify icon="eva:log-out-outline" />Deconnexion
			</MenuItem>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
			>
				<DialogTitle>{"Deconnexion"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Etes-vous sûr de vouloir vous deconnecter?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Annuler</Button>
					<Button onClick={handleClose}>Se deconnecter</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
