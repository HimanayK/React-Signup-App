import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './Dashboard.css';
  import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Game States
  const [randomNumber, setRandomNumber] = useState(null); // Random number to guess
  const [guess, setGuess] = useState(''); // User's input as string
  const [message, setMessage] = useState(''); // Game message
  const [attempts, setAttempts] = useState(0); // Count of guesses

  // When component loads, check if user is logged in and generate random number
  useEffect(() => {
    if (!user) {
      navigate('/login'); // If user not found, redirect to login
    } else {
      generateNumber(); // Start the game
    }
  }, []);

  // Function to generate a number between 1 to 10
  const generateNumber = () => {
    const number = Math.floor(Math.random() * 10) + 1;
    setRandomNumber(number);
    setMessage('');
    setAttempts(0);
    setGuess('');
  };

  // Function to handle user's guess
  const handleGuess = () => {
    const guessNum = parseInt(guess); // Convert string to number

    if (isNaN(guessNum) || guessNum < 1 || guessNum > 10) {
      setMessage("❌ Please enter a valid number between 1 and 10.");
      return;
    }

    setAttempts(prev => prev + 1); // Increase guess count

    if (guessNum === randomNumber) {
      setMessage(`🎉 Correct! The number was ${randomNumber}. You guessed it in ${attempts + 1} tries.`);
    } else if (guessNum < randomNumber) {
      setMessage("📉 Too low! Try a higher number.");
    } else {
      setMessage("📈 Too high! Try a lower number.");
    }
  };

  // Logout user
  const handleLogout = () => {
    toast.success('Logged out successfully');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="main-container">
      <div className="dashboard-container">
        <h1>Welcome, {user?.myName} 🎉</h1>
        <p>
          Let's play: <strong>Guess a number between 1 and 10</strong>
        </p>

        <div className="game">
          {/* Input and Guess button in one row */}
          <div className="input-row">
            <input
              type="text"
              value={guess}
              placeholder="Enter your guess"
              onChange={(e) => setGuess(e.target.value)}
            />
            <button onClick={handleGuess}>Guess</button>
          </div>

          {/* Show Game message */}
          <p className="message">{message}</p>

          {/* Restart button below */}
          <button onClick={generateNumber}>🔁 Restart Game</button>
        </div>

        <div className="buttons">
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



// import { useNavigate } from 'react-router'


// const Dashboard = () => {
//   const navigate = useNavigate();

//   function handleLogout() {
//     navigate('/login');
//   }
//   return (
//     <div>
//     <h1>Welcome to Dashboard</h1>
//     <button onClick={handleLogout}>Logout</button>
//     </div>
    
//   )
// }

// export default Dashboard