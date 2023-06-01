const UserController = require('../controllers/user.js');
const db = require('../models/index.js');
const User = db.sequelize.models.User;

// Mock User model
jest.mock('../models', () => ({
	sequelize: {
		models: {
			User: { findOne: jest.fn() }
		}
	}
}));

let mockReq, mockRes, mockNext, mockUser;
beforeEach(() => {
	// Create mock user
	mockUser = {
		update: jest.fn()
	};

	// Set up User.findOne to return the mock user
	db.sequelize.models.User.findOne.mockResolvedValue(mockUser);

	// Set up request and response
	mockReq = {
		params: { id: 1 },
		body: { name: 'John Doe' },
		file: null,
		protocol: 'http',
		get: jest.fn(() => 'localhost')
	};
	mockRes = {
		status: jest.fn(() => mockRes),
		json: jest.fn(),
	};
	mockNext = jest.fn();
});

test('EditUserAdmin shoueditUserAdminld met à jour l\'utilisateur et renvoie l\'utilisateur mis à jour', async () => {
	mockUser.update.mockResolvedValue(mockReq.body);

	await UserController.editUserAdmin(mockReq, mockRes, mockNext);

	expect(User.findOne).toHaveBeenCalledWith({ where: { id: mockReq.params.id } });
	expect(mockUser.update).toHaveBeenCalledWith(mockReq.body);
	expect(mockRes.status).toHaveBeenCalledWith(200);
	expect(mockRes.json).toHaveBeenCalledWith({ user: mockReq.body });
});

