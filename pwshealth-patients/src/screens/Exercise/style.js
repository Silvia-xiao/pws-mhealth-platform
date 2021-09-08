import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    item: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: "80%",
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
        fontWeight: "bold"
    },
    addButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems:"center",
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'lightgray',
        margin: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    largerImage: {
        width: 300,
        height: 200,
        alignSelf:"center"
    },
    imageText: {
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center"
    },
    progressBar: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 15,
        alignSelf: "center"
    }
})