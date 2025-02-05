import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Users, Skull, Target, Crown } from "lucide-react";
import sendMessage from "./sendMessage";

import axios from "axios";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  

const getNumDeceivers = (playerCount: number): number => {
  if (playerCount <= 5) return 1;
  if (playerCount <= 12) return 2;
  if (playerCount <= 21) return 3;
  return 4;
};

const getRandomDeceivers = (players: Array<{name: string, phone: string}>, numDeceivers: number) => {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numDeceivers);
};


  const addPlayer = () => {
    if (name && phone) {
      setPlayers([...players, { name, phone }]);
      setName("");
      setPhone("");
    } else {
      alert("Please enter both name and phone number");
    }
  };

  const startGame = async () => {
    if (players.length < 5) {
      alert("You need at least 5 players!");
      return;
    }
    try {
      const numDeceivers = getNumDeceivers(players.length);
      const deceivers = getRandomDeceivers(players, numDeceivers);
      
      console.log('Deceivers:', deceivers.map(d => d.name));
      
      const gameRef = await addDoc(collection(db, "games"), {
        players,
        status: "active",
        numDeceivers,
        deceivers,
      });
      alert("Game started successfully!");
      setGameStarted(true);
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Failed to start game");
    }
  };

  /*const sendMessage = async () => {
    if (players.length === 0) {
      alert("No players to send messages to!");
      return;
    }
  
    try {
      await Promise.all(
        players.map(async (player) => {
          await axios.post("http://127.0.0.1:5000/send-message", {
            phone_number: player.phone, // Send to each player's phone
            message: `Hi ${player.name}, ${message}`,
          });
        })
      );
  
      alert("Messages sent successfully!");
    } catch (error) {
      console.error("Error sending messages:", error);
      alert("Failed to send messages");
    }
  };*/
  

  const handleStartGame = () => {
    startGame();
    sendMessage(players);
  };    

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="min-h-screen bg-black/75 backdrop-blur-sm p-8">
        <div className="max-w-4xl mx-auto text-white">
          <div className="d-flex items-center justify-between mb-12">
            <h1 className="text-4xl text-red-500 font-bold flex justify-center items-center gap-3 m-4 py-4">
              <i className="fa-solid fa-skull w-12 h-12"></i>
              The Deceivrs
            </h1>
            <div className="mb-6 text-lg text-gray-300">
            <p>
  Welcome to <strong className="text-red-500"> The Deceivrs</strong> - a game based on the popular TV show <strong className="text-red-500">The Traitors.</strong></p>
  <h1 className="text-2xl text-red-500 font-bold flex justify-center items-center gap-3 m-2"><strong> The rules </strong></h1>
  <ul>
    <li>Enter the Name and phone numbers of everyone playing. The game can begin when a minimum of 5 players are entered and <em className="italic text-red-400">Start Game</em> is clicked.</li>
    <li>Deceivers and loyals will be chosen at random.</li>
    <li>EVERYONE will receive a text message notifying them of their role.</li>
    <li><strong className="text-red-500">THE GAME BEGINS.</strong></li>
    <h1 className="text-2xl text-red-500 font-bold flex justify-center items-center gap-3 m-2"><strong> How to win </strong></h1>
  
    <li>Suspected Deceivers are voted out by the majority vote.</li>
    <li>Once a player is voted out, they must declare truthfully if they are a Deceiver or Loyal.</li>
    <li>The game ends when theres a unanimous vote to end it.</li>
    <li>If any deceivers are left at the end, the deceivers win.</li>
    <li>If all deceivers are voted out, the loyals win.</li>
    <li><strong className="text-red-500">Vote Wisely!</strong></li>
  </ul>
</div>
            
          </div>

          <div className="grid md:grid-cols-[2fr,3fr] gap-8">
            <div className="bg-black/50 border border-red-900/50 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-red-500">
                <i className="fa-solid fa-bullseye w-6 h-6"></i>
                Join the Hunt
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-red-900/50 focus:outline-none focus:border-red-500"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-red-900/50 focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={addPlayer}
                  className="w-full py-2 bg-red-900 hover:bg-red-800 rounded-lg transition-colors"
                >
                  Join Game
                </button>
              </div>
            </div>

            <div className="bg-black/50 border border-red-900/50 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-red-500">
                <i class="fa-regular fa-user w-6 h-6"></i>
                Conspirators ({players.length} players)
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {players.map((player, index) => (
                  <div key={index} className="bg-black/50 border border-red-900/50 p-3 rounded-lg">
                    <div className="font-semibold">{player.name}</div>
                    <div className="text-red-400 text-sm">{player.phone}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleStartGame}
                disabled={gameStarted}
                className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  gameStarted 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-red-900 hover:bg-red-800'
                }`}
              >
                <i class="fa-solid fa-crown w-5 h-5"></i>
                {gameStarted ? 'Game has began!' : 'Begin the Hunt'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )};


export default App;