import { useCallback, useState } from 'react';
import jwtDecode from 'jwt-decode';
import userService from '../services/userService';

export default function useAuth() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [id, setId] = useState(null);
	const [user, setUser] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [avatarUrl, setAvatarUrl] = useState('');

	const login = useCallback(async (data) => {
		setLoading(true);
		setError(null);

		const response = await userService.connectUser(data);
		
		if (response.error) {
			setError(response.error);
			setLoading(false);
			throw new Error(response.error);
		}
		setLoading(false);
		localStorage.setItem('token', response.token);
		const user = response.user || null;

		// Récupérer l'ID de l'utilisateur
		const userId = user ? user.id : null;
		setId(userId)
		return user;
	}, []);

	// Pour la déconnexion
	const logout = useCallback(() => {
		localStorage.removeItem('token');
	}, []);

	// Récupérationdes données de l'utilisateur connecter grace à son Id
	const handleUser = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const token = localStorage.getItem('token');
			const decodedToken = jwtDecode(token);
			const userId = decodedToken.userId;

			const response = await userService.findOneUser(userId);
			console.log("FromUseAuth", response.data.user);
			setLoading(false);

			if (response.error) {
				setError(response.error);
				throw new Error(response.error);
			} else {
				console.log(response)
				setUser(response.data.user);
				setFirstName(response.data.user.firstName);
				setLastName(response.data.user.lastName);
				setEmail(response.data.user.email);
				setAvatarUrl(response.data.user.imageUrl || '');
				return response.data;
			}
		} catch (error) {
			setLoading(false);
			setError(error.message);
			throw new Error(error.message);
		}
	}, []);

	return { id, setId, user, firstName, lastName, email, avatarUrl, setAvatarUrl,setUser, login, logout, handleUser, loading, error };
}
