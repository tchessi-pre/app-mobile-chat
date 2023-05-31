const { ensurePasswordIsStrongEnough, addAuthenticationOn } = require('../services/authentication');

// Mock du module 'bcrypt'
jest.mock('bcrypt', () => ({
	hash: jest.fn(),
	compare: jest.fn(),
}));

const bcrypt = require('bcrypt');

// Mock du module 'User'
const User = {
	findOne: jest.fn(),
	beforeCreate: jest.fn(),
	beforeUpdate: jest.fn(),
	authenticate: jest.fn(),
};

// Réinitialisation des fonctions mockées avant chaque test
beforeEach(() => {
	jest.clearAllMocks();
	addAuthenticationOn(User); 
});

describe('ensurePasswordIsStrongEnough', () => {
	test('devrait lancer une exception si le mot de passe n\'est pas assez fort', () => {
		const weakPassword = 'weak';

		expect(() => ensurePasswordIsStrongEnough(weakPassword)).toThrowError(
			'Le mot de passe doit contenir au moins 8 caractères (dont au moins une majuscule, une minuscule, un chiffre, un caractère spécial).'
		);
	});

	test('ne devrait pas lancer une exception si le mot de passe est suffisamment fort', () => {
		const strongPassword = 'Strong@Passw1rd';

		expect(() => ensurePasswordIsStrongEnough(strongPassword)).not.toThrow();
	});
});

describe('addAuthenticationOn', () => {
	test('devrait renvoyer un message d\'erreur si l\'utilisateur n\'est pas trouvé', async () => {
		User.findOne.mockResolvedValue(null);

		const response = await User.authenticate('email@test.com', 'Test@1234');

		expect(response).toEqual({ valid: false, message: 'Utilisateur non trouvé' });
	});

	test('devrait renvoyer un message d\'erreur si le mot de passe n\'est pas correct', async () => {
		const user = { password: 'hashedpassword' };
		User.findOne.mockResolvedValue(user);
		bcrypt.compare.mockImplementationOnce(() => Promise.resolve(false));

		const response = await User.authenticate('email@test.com', 'Test@1234');

		expect(response).toEqual({ valid: false, message: 'Mot de passe incorrect' });
	});

	test('devrait renvoyer l\'utilisateur si l\'email et le mot de passe sont corrects', async () => {
		const user = { password: 'hashedpassword' };
		User.findOne.mockResolvedValue(user);
		bcrypt.compare.mockImplementationOnce(() => Promise.resolve(true));

		const response = await User.authenticate('email@test.com', 'Test@1234');

		expect(response).toEqual({ valid: true, user });
	});
});
