import instance from './config';

const userService = {
	// Créer un utilisateur
	async createUser(data) {
		try {
			const response = await instance.post('/api/auth/signup', data);
			return response;
		} catch (error) {
			return error.response?.data;
		}
	},

	// Connecter un utilisateur
	async connectUser(data) {
		try {
			const response = await instance.post('/auth/login', data);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	},

	// Récupérer les données de l'utilisateur via son token
	async getMe(id) {
		try {
			const response = await instance.get(`/users/${id}`);
			return response;
		} catch (error) {
			return error.response.data;
		}
	},

	// Récupérer un seul user via son id
	async findOneUser(id) {
		try {
			const response = await instance.get(`/users/${id}`);
			return response;
		} catch (error) {
			return error.response.data;
		}
	},

	// Récupérer toutes les utilisateurs
	async findUsers() {
		try {
			const response = await instance.get('/users');
			return response;
		} catch (error) {
			return error.response.data;
		}
	},

	// Modifier un utilisateur
	async updateUser(id) {
		try {
			const response = await instance.put(`/auth/edit/${id}`);
			return response;
		} catch (error) {
			return error.response.data;
		}
	},

	// Supprimer un utilisateur
	async destroyUser(id) {
		try {
			const response = await instance.delete(`/users/${id}`);
			return response;
		} catch (error) {
			return error.response.data;
		}
	},
};

export default userService;
