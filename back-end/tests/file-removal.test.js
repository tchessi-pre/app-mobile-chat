const { deleteFile } = require('../services/file-removal');
const fs = require('fs');

// Mock fs module
jest.mock('fs', () => ({
	unlink: jest.fn(),
}));

beforeEach(() => {
	fs.unlink.mockReset();
});

describe('deleteFile', () => {
	it('doit appeler fs.unlink avec le bon chemin', () => {
		const imageUrl = 'http://example.com/public/image.jpg';
		deleteFile(imageUrl);
		expect(fs.unlink).toHaveBeenCalledWith('public/image.jpg', expect.any(Function));
	});

	it('ne doit pas appeler fs.unlink si imageUrl n\'est pas fourni', () => {
		deleteFile(null);
		expect(fs.unlink).not.toHaveBeenCalled();
	});
});
