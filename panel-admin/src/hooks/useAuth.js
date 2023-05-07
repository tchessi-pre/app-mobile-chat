import { useCallback, useState } from 'react';
import jwtDecode from 'jwt-decode';
import userService from '../services/userService';

export default function useAuth() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [id, setId] = useState(null);
	const [user, setUser] = useState('');
	const [users, setUsers] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [avatarUrl, setAvatarUrl] = useState('');
	const [messages, setMessages] = useState([]);
	const [imageContent, setImageContent] = useState([]);
	const [createdUser, setCreatedUser] = useState(null);


	const handleCreateUser = useCallback(async (data) => {
		setLoading(true);
		setError(null);
		try {
			const response = await userService.createUser(data);
			setLoading(false);
			if (response.error) {
				setError(response.error);
				return { error: response.error }; // Return error response
			}

			setCreatedUser(response.data);
			return { data: response.data }; // Return data response
		} catch (error) {
			setLoading(false);
			setError(error.message);
			return { error: error.message }; // Return error response
		}
	}, []);


	// Connexion d'un utilisateur
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
			setLoading(false);

			if (response.error) {
				setError(response.error);
				throw new Error(response.error);
			} else {
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

	// Récupéraripon de tous les utilisateurs
	const handleAllUsers = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			
			const response = await userService.findUsers();
			console.log("findUsers", response.data)
			setLoading(false);
			if (response.error) {
				setError(response.error);
				throw new Error(response.error);
			} else {
				setUsers(response.data.users)
				return response.data;
			}
		} catch (error) {
			setLoading(false);
			setError(error.message);
			throw new Error(error.message);
		}
	}, []);
	
	// Récupération des messages postés
	const handlePosts= useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			
			const response = await userService.getPosts();
			console.log("findMessages", response.data)
			setLoading(false);
			if (response.error) {
				setError(response.error);
				throw new Error(response.error);
			} else {
				setMessages(response.data.posts)
				setImageContent(response.data.posts.imageUrl)
				return response.data;
			}
		} catch (error) {
			setLoading(false);
			setError(error.message);
			throw new Error(error.message);
		}
	}, []);
	return { id, setId, user, users, firstName, lastName, email, avatarUrl, messages, createdUser, setAvatarUrl, setUser, setUsers, setMessages, imageContent, setImageContent, setCreatedUser,login, logout, handleUser, handleCreateUser, handleAllUsers, handlePosts, loading, error };
}
