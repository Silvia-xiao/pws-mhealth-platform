import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    item: {
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5
    },
    card: {
        alignItems: "center",
        padding:10,
        margin: 20,
        width: 170,
        marginHorizontal: 10,
        marginVertical: 10
    },
    itemimage: {
        width: 150,
        height: 120,
        borderRadius:5
    },
    itemText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    recommendationTitle: {
        fontSize: 20,
        marginTop: 10,
        alignSelf: "center",
        fontWeight: 'bold'
    },
    recommendation: {
        marginBottom: 10,
        height:80,
        width:300,
        alignSelf:'center',
        fontSize: 18,
        fontStyle: 'italic'
    },
    recommondationBoard: {
        backgroundColor: '#ccccff',
        borderRadius: 5,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        height: 120,
        elevation:10
    }
})
