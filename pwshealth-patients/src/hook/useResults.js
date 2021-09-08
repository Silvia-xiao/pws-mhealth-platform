import { useEffect, useState } from 'react';
import edamam from '../api/edamam';

export default () => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async (searchTerm) => {
        console.log('hi');
        try{
        const response = await edamam.get('', {
            params: {
                ingr: searchTerm,
                app_id: "d20a87e0",
                app_key: "9edaeb12df66093dfd386fecc14df6d3",
            }
        });
        setResults(response.data);
        } catch (err) {
            setErrorMessage('Something went wrong...')
        }  
    };

    //Call searchApi when component is first rendered
    //searchApi('pasta')   BAD CODE!! lec 101
    //BETTER WAY

    // useEffect(() => {
    //     searchApi('pasta');
    // }, []);
    return [searchApi, results, errorMessage];
}