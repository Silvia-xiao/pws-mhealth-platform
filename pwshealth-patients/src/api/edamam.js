import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.edamam.com/api/food-database/v2/parser',
    // headers: {
    //     Authorization: 'Bearer lms6NZTqyL6Y4CXZr8V3XaXegO9fshsAez1KYSU_Gc81fMpmcGmuakEeXN-MnCLKXQNU4gVtprGRVybKgzRButH_9P1AX68X10Qcesl12B0mtxaYPb7EXEckODkyYHYx'
    // }
});
