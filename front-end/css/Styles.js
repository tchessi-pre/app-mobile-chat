import { StyleSheet } from 'react-native';


export default StyleSheet.create({

		submit: {
			marginLeft: 20,
			marginRight: 20,
			paddingTop: 12,
			paddingBottom: 12,
			backgroundColor: '#FF6B6B',
			borderRadius: 30,
			marginTop: 20,
		},
		submitText: {
			color: '#ffffff',
			textAlign: 'center',
			textTransform: 'uppercase',
		},
	input: {
		height: 40,
		margin: 10,
		borderWidth: 1,
		borderColor: "#152033",
		backgroundColor: "#152033",
		borderRadius: 4,
		color: "#ffffff",
		paddingLeft: 10,
	},
	logoArea: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	companyName: {
		color: '#ffffff',
		fontSize: 24,
		fontWeight: 'bold',
		fontStyle: 'italic',
		textAlign: 'center',
	},

	logo: {
		width: 200,
		height: 200,
	},
})