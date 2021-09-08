import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    item: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: "80%"
    },
    category:{
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: "90%"
    },
    itemimage: {
        width: 150,
        height: 150
    },
    itemText: {
        fontWeight: "bold",
        fontSize: 20
    },
    addButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems:"center",
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#6495ed',
        margin: 10,
        elevation:5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    largerImage: {
        width: 330,
        height: 210,
        alignSelf:"center",
        borderRadius:5
    },
    imageText: {
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "center"
    },
    progressBar: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 15,
        alignSelf: "center"
    },
    food: {
        fontSize: 15
    },
    editButton: {
        width: 70,
        elevation: 5,
        height: 30,
        alignItems:"center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#6495ed',
        marginHorizontal: 5
    },
    card: {
        alignItems: "center",
        padding:10,
        margin: 10,
        width: 170,
        marginHorizontal: 10,
        marginVertical: 10,
        width: "80%"
    },
    deleteButton:{
        width: 70,
        height: 30,
        elevation: 5,
        alignItems:"center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#6495ed',
        marginHorizontal: 5
        
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }

    
    
})
