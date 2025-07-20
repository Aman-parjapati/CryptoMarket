import { createContext, useEffect, useState } from "react";

export const Coincontext = createContext()

const CoincontextProvider = (props) => {

    const[allcoins, setallCoins] = useState([])
    const[currency, setCurrency] = useState({
        name : 'usd',
        Symbol: '$'
    })


    const fetchAllCoins = async() => {
        const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Ur85hTmkayrRWnRPu3ujBJNM'}
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
        .then(res => res.json())
        .then(res => setallCoins(res))
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchAllCoins();
        const interval = setInterval(fetchAllCoins, 10000);
        return () => clearInterval(interval);
    },[currency])

    const contextvalue = {
        allcoins, currency, setCurrency
    }

    return(

        <Coincontext.Provider value={contextvalue}>
            {props.children}
        </Coincontext.Provider>
    )
}

export default CoincontextProvider