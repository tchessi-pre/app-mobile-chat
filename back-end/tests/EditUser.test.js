const UserController = require('../controllers/user');

// Mock User attached to the request
let mockReqUser;
beforeEach(() => {
	mockReqUser = {
		update: jest.fn()
	};
});

// Mock Request and Response
let mockReq, mockRes, mockNext;
beforeEach(() => {
	mockReq = {
		user: mockReqUser,
		body: { name: 'John Doe' },
		file: null,
		protocol: 'http',
		get: jest.fn(() => 'localhost')
	};
	mockRes = {
		status: jest.fn(() => mockRes),
		json: jest.fn()
	};
	mockNext = jest.fn();
});

test('editUser should update the user and return the updated user', async () => {
	mockReqUser.update.mockResolvedValue(mockReq.body);

	await UserController.editUser(mockReq, mockRes, mockNext);

	expect(mockReqUser.update).toHaveBeenCalledWith(mockReq.body);
	expect(mockRes.status).toHaveBeenCalledWith(200);
	expect(mockRes.json).toHaveBeenCalledWith({ user: mockReq.body });
});
