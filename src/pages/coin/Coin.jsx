import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { Coincontext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {

  const {coinId} = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const {currency} = useContext(Coincontext)

const fetchCoinData = async () => {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const data = await res.json();
    setCoinData(data);
  } catch (err) {
    console.error(err);
  }
};

const fetchHistoricalData = async () => {
  const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-pro-api-key': 'CG-Ur85hTmkayrRWnRPu3ujBJNM'}
};

fetch(`https://pro-api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`, options)
  .then(res => res.json())
  .then(res => setHistoricalData(res))
  .catch(err => console.error(err));
}

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency])

  if(coinData && historicalData){
    return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt='' />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData}/>
      </div>
    </div>
  )
  } else {
    return (
    <div className='spinner'>
      <div className="spin" />
    </div>
  )
  }
}

export default Coin