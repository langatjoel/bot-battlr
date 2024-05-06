import React, { useEffect, useState } from 'react';
import BotCollection from './components/BotCollection';
import BotArmy from './components/BotArmy';
import SortBar from './components/SortBar';
import './App.css'; // Import your CSS file for styling

export default function App() {
  const botsAPI = 'https://bots-taupe.vercel.app/bots';
  const [bots, setBots] = useState([]);

  useEffect(() => {
    fetch(botsAPI)
      .then((res) => res.json())
      .then(setBots);
  }, []);

  function enlistBot(id) {
    setBots(bots.map((bot) => (id === bot.id ? { ...bot, isEnlisted: true } : bot)));
  }

  function delistBot(id) {
    setBots(bots.map((bot) => (id === bot.id ? { ...bot, isEnlisted: false } : bot)));
  }

  function dischargeBot(id) {
    setBots(bots.filter((bot) => (bot.id === id ? false : true)));
  }

  // Function to sort bots by criteria (health, damage, or armor)
  function handleSort(criteria) {
    const sortedBots = [...bots].sort((a, b) => b[criteria] - a[criteria]);
    setBots(sortedBots);
  }

  return (
    <div className="app-container">
      <h1 className="app-heading">Bot Battlr</h1>
      <div className="app-content">
        <SortBar handleSort={handleSort} />
        <BotArmy bots={bots.filter((bot) => bot.isEnlisted)} handleDischarge={dischargeBot} handleClick={delistBot} />
        <BotCollection bots={bots} handleDischarge={dischargeBot} handleClick={enlistBot} />
      </div>
    </div>
  );
}