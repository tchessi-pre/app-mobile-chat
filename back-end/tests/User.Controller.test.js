const UserController = require('../controllers/user');
const User = require('../models').sequelize.models.User;
const jwt = require('jsonwebtoken');

jest.mock('../models', () => ({
	sequelize: {
		models: {
			User: {
				create: jest.fn(),
			},
		},
	},
}));

jest.mock('jsonwebtoken');

beforeEach(() => {
	jest.resetAllMocks();
});

describe('UserController', () => {
	describe('signup', () => {
		it('Devrait créer un nouvel utilisateur et renvoyer un token', async () => {
			const mockUser = { firstName: 'John', lastName: 'Doe', email: 'john@doe.com', password: 'password' };
			const mockReq = { body: mockUser };
			const mockRes = {
				status: jest.fn(() => mockRes),
				json: jest.fn(),
			};
			const mockNext = jest.fn();
			const mockToken = 'mockToken';

			User.create.mockResolvedValue({ ...mockUser, id: 1 });
			jwt.sign.mockReturnValue(mockToken);

			await UserController.signup(mockReq, mockRes, mockNext);

			expect(User.create).toHaveBeenCalledWith(mockUser);
			expect(mockRes.status).toHaveBeenCalledWith(201);
			expect(mockRes.json).toHaveBeenCalledWith({ user: { ...mockUser, id: 1 }, token: mockToken });
		});

		it('Devrait retourner 401 si la création d\'un utilisateur échoue', async () => {
			const mockUser = { firstName: 'John', lastName: 'Doe', email: 'john@doe.com', password: 'password' };
			const mockReq = { body: mockUser };
			const mockRes = {
				status: jest.fn(() => mockRes),
				json: jest.fn(),
			};
			const mockNext = jest.fn();
			const mockError = new Error('Creation failed');

			User.create.mockRejectedValue(mockError);

			await UserController.signup(mockReq, mockRes, mockNext);

			expect(User.create).toHaveBeenCalledWith(mockUser);
			expect(mockRes.status).toHaveBeenCalledWith(401);
			expect(mockRes.json).toHaveBeenCalledWith({ error: mockError });
		});
	});
});

// Test du controller login

describe('UserController', () => {
	beforeEach(() => {
		// Réinitialiser toutes les imitations avant chaque test
		jest.clearAllMocks();
	});

	describe('login', () => {
		it('should log in a user and return a token', async () => {
			const mockReq = {
				body: {
					email: 'testuser@example.com',
					password: 'password',
				},
			};
			const mockRes = {
				status: jest.fn(() => mockRes),
				json: jest.fn(),
			};
			const mockNext = jest.fn();
			const mockUser = {
				id: 1,
				email: 'testuser@example.com',
				status: 'online',
				save: jest.fn().mockResolvedValue(),
			};

			// Mocker le comportement de User.authenticate pour retourner un utilisateur valide
			User.authenticate = jest.fn().mockResolvedValue({
				valid: true,
				user: mockUser,
			});

			// Mocker le comportement de jwt.sign pour retourner un token
			jwt.sign = jest.fn().mockReturnValue('token');

			await UserController.login(mockReq, mockRes, mockNext);

			expect(User.authenticate).toHaveBeenCalledWith(mockReq.body.email, mockReq.body.password);
			expect(mockRes.status).toHaveBeenCalledWith(201);
			expect(mockRes.json).toHaveBeenCalledWith({ user: mockUser, token: 'token' });
		});

		it('should return 401 if login fails', async () => {
			const mockReq = {
				body: {
					email: 'testuser@example.com',
					password: 'wrongpassword',
				},
			};
			const mockRes = {
				status: jest.fn(() => mockRes),
				json: jest.fn(),
			};
			const mockNext = jest.fn();

			// Mocker le comportement de User.authenticate pour retourner un utilisateur non valide
			User.authenticate = jest.fn().mockResolvedValue({ valid: false });

			await UserController.login(mockReq, mockRes, mockNext);

			expect(User.authenticate).toHaveBeenCalledWith(mockReq.body.email, mockReq.body.password);
			expect(mockRes.status).toHaveBeenCalledWith(401);
			expect(mockRes.json).toHaveBeenCalled();
		});

		it('should return 500 if there is an exception', async () => {
			const mockReq = {
				body: {
					email: 'testuser@example.com',
					password: 'password',
				},
			};
			const mockRes = {
				status: jest.fn(() => mockRes),
				json: jest.fn(),
			};
			const mockNext = jest.fn();

			// Mocker le comportement de User.authenticate pour rejeter avec une erreur
			User.authenticate = jest.fn().mockRejectedValue(new Error('Server error'));

			await UserController.login(mockReq, mockRes, mockNext);

			expect(User.authenticate).toHaveBeenCalledWith(mockReq.body.email, mockReq.body.password);
			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalled();
		});
	});
});