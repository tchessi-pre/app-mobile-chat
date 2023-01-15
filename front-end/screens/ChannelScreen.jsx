import React from 'react';
import { View, StyleSheet, Text, ScrollView, Button, TouchableHighlight } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
import SearchBar from '../components/SearchBar';
import Profil from '../components/Profil';


const ChannelScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Text style={styles.textTop}>Utilisateurs</Text>
				<Avatar
					rounded
					source={require('../assets/monprofil.png')}
					onPress={() => console.log("Works!")}
					activeOpacity={0.7}
				/>
			</View>
			<ScrollView>
				<View style={styles.searchBar}>
					<SearchBar />
				</View>
				<View style={styles.separator}></View>
				<View>
					<Profil />
					<Badge
						status="success"
						containerStyle={{ position: 'absolute', top: 1, left: 50 }}
					/>
				</View>
				<View style={styles.separator}></View>
				<View style={styles.separator}></View>
				<View>
					<Profil />
					<Badge
						size={50}
						status="error"
						containerStyle={{ position: 'absolute', top: 1, left: 50 }}
					/>
				</View>
				<View style={styles.separator}></View>
				<View style={styles.separator}></View>
				<View>
					<Profil />
					<Badge
						status="success"
						containerStyle={{ position: 'absolute', top: 1, left: 50 }}
					/>
				</View>
				<View style={styles.separator}></View>
				<View style={styles.separator}></View>
				<View>
					<Profil />
					<Badge
						status="success"
						containerStyle={{ position: 'absolute', top: 1, left: 50 }}
					/>
				</View>
				<View style={styles.separator}></View>
				<View style={styles.separator}></View>
				<View>
					<Profil />
					<Badge
						status="success"
						containerStyle={{ position: 'absolute', top: 1, left: 50 }}
					/>
				</View>
				<View style={styles.separator}></View>
				<View style={styles.separator}></View>
				<View>
					<Profil />
					<Badge
						status="success"
						containerStyle={{ position: 'absolute', top: 1, left: 50 }}
					/>
				</View>
				<View style={styles.separator}></View>
				<View style={styles.separator}></View>
				<View>
					<Profil />
					<Badge
						status="success"
						containerStyle={{ position: 'absolute', top: 1, left: 50 }}
					/>
				</View>
				<View style={styles.separator}></View>
				<View style={styles.separator}></View>
				<View>
					<Profil />
					<Badge
						status="success"
						containerStyle={{ position: 'absolute', top: 1, left: 50 }}
					/>
				</View>
				<View style={styles.separator}></View>
				<View style={styles.separator}></View>
				<View>
					<Profil />
					<Badge
						status="success"
						containerStyle={{ position: 'absolute', top: 1, left: 50 }}
					/>
				</View>
				<View style={styles.separator}></View>
				
			</ScrollView>
			<View>

			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: '#0F1828',
		paddingHorizontal: 20,
	},
	top: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',

	},
	textTop: {
		color: '#ffffff',
		fontSize: 18,
	},
	
	profil__button: {
		width: 30,
		height: 30,
		borderRadius: 30,
		fontSize: 16,
		backgroundColor: '#152033',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center'
	},
	textbtn__profil: {
		color: '#ffffff',
		fontSize: 18,
		textAlign: 'center',
	},
	separator: {
		height: 1,
		backgroundColor: "#20252d",
		marginTop: 10,
		marginBottom: 10,
	}
})

export default ChannelScreen;
