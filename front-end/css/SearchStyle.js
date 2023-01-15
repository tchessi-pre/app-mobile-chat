import { StyleSheet } from 'react-native';


export default StyleSheet.create({
	container: {
		margin: 15,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		width: "90%",
		marginHorizontal: 20,
	},
	searchBar__unclicked: {
		padding: 6,
		flexDirection: "row",
		width: 290,
		borderRadius: 15,
		alignItems: "center",
		borderRadius: 4,
		backgroundColor: '#152033',

	},
	searchBar__clicked: {
		padding: 10,
		flexDirection: "row",
		width: "80%",
		backgroundColor: "#d9dbda",
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	input: {
		fontSize: 14,
		marginLeft: 10,
		width: "90%",

	},
})