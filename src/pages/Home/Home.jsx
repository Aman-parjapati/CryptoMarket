import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Coincontext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

const {allcoins, currency} = useContext(Coincontext);
const [displayCoin, setDisplayCoin] = useState([]);

const [input, setInput] = useState('');

// finds the data for searchbar
const inputHandler = (event) => {
setInput(event.target.value)
if(event.target.value === null){
  setDisplayCoin(allcoins)
  console.log(setDisplayCoin(allcoins))
}
}

//searchbar
const searchHandler = async (e) => {
  e.preventDefault(); 
  const coins = await allcoins.filter((item) => {
    return item.name.toLowerCase().includes(input.toLowerCase())
  })
  setDisplayCoin(coins);  // to display the data
}

useEffect(() => {
  setDisplayCoin(allcoins);
}, [allcoins])

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br/>Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. Signup to explore more about cryptos.</p>
        <form onSubmit={searchHandler}>
          <input value={input} onChange={inputHandler} type='text' list='coinlist' placeholder='Search cryptos...' required/>

          <datalist id='coinlist' >
            {allcoins.map((item, index) => (<option key={index} value={item.name} />))}
          </datalist>

          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24hrs change</p>
          <p className='market-cap'>Market cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((item, index)=>(
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt=''/>
                <p>{item.name +"-" + item.symbol}</p>
              </div>
              <p>{currency.Symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_24h*100 > 0 ? "green" : "red"}>
                {Math.floor(item.price_change_24h*100)/100}
              </p>
              <p className='market-cap'>{currency.Symbol}{item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home