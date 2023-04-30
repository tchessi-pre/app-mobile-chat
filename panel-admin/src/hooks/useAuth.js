import { useCallback, useState } from 'react';
import userService from '../services/userService';

export default function useAuth() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

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
		return user; 
	}, []);

	// Pour la déconnexion
	const logout = useCallback(() => {
		localStorage.removeItem('token');
	}, []);
	return { login, logout, loading, error };
}
