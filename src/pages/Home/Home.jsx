import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Coincontext } from '../../context/CoinContext'

const Home = () => {

const {allcoins, currency} = useContext(Coincontext);
const [displayCoin, setDisplayCoin] = useState([]);

useEffect(() => {
  setDisplayCoin(allcoins);
}, [allcoins])

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br/>Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. Signup to explore more about cryptos.</p>
        <form>
          <input type='text' placeholder='Search cryptos...'/>
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
            <div className="table-layout" key={index}>
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
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home