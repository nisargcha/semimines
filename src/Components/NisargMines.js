import React, { useEffect, useState } from 'react';
import diamond from './Images/diamond.png';
import bomb from './Images/bomb.png';

export default function NisargMine() {
    const [grid, setGrid] = useState(Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => ({ revealed: false, content: 'empty' }))));
    const [gameOver, setGameOver] = useState(false);
    const [minesCount, setMinesCount] = useState(10); 

    useEffect(() => {
        generateMine();
    }, [minesCount]); 

    function generateMine() {
        let newGrid = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => ({ revealed: false, content: 'diamond' }))); // Initialize all cells as diamonds
    
        let minecnt = 0;
        while (minecnt < minesCount) { 
            let row = Math.floor(Math.random() * 5);
            let column = Math.floor(Math.random() * 5);
    
            if (newGrid[row][column].content === 'diamond') {
                newGrid[row][column].content = 'bomb';
                minecnt++;
            }
        }
    
        setGrid(newGrid); 
    }
    
    function checkmine(r, c) {
        let newGrid = [...grid]; 
        
        if(newGrid[r][c].content === 'bomb'){
            newGrid[r][c].revealed = true;
            setGrid(newGrid); 
            setTimeout(() => {
                newGrid.forEach(row => row.forEach(cell => cell.revealed = true));
                setGrid(newGrid); 
                alert("You hit a bomb! Game over. You lose.");
                setGameOver(true);
            }, 100);
        } else {
            newGrid[r][c].revealed = true; 
            setGrid(newGrid); 
        }
    }

    function handleInputChange(event) {
        setMinesCount(parseInt(event.target.value));
    }


    // Reset game function
    function resetGame() {
        setGrid(Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => ({ revealed: false, content: 'empty' })))); // Reset grid
        setGameOver(false); // Reset game over state
        generateMine(); // Regenerate mines
    }

    return (
        <>
            <div className='flex justify-center align-middle   w-auto'>
                <div className='grid grid-cols-5 text-center w-96 h-96 py-5 px-5 bg-gray-800 border-black border-solid border-4'>
                    {grid.map((row, rowIndex) => (
                        <div key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <button
                                    key={`${rowIndex}-${colIndex}`}
                                    className='rounded-lg shadow-2xl w-16 h-16 col-start-1 col-end-2 row-start-1 row-end-2 border-solid border-black border-2 bg-gray-400 text-white transition duration-150  hover:scale-110 hover:shadow-2xl'
                                    onClick={() => checkmine(rowIndex, colIndex)}
                                    disabled={cell.revealed || gameOver}
                                >
                                    {cell.revealed ? (
                                        <img src={cell.content === 'bomb' ? bomb : diamond} alt={cell.content} className='w-16 h-16 rounded-lg'/>
                                    ) : null}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex-cols justify-center align-middle mx-96 px-64 py-3'>
                <div className="w-72 bg-gray-200 rounded-full h-8 flex items-center px-2 relative">
                    <input
                        type="range"
                        min="1"
                        max="24"
                        value={minesCount}
                        onChange={handleInputChange}
                        className="w-full h-full bg-transparent appearance-none outline-none z-10"/>
                    <span className="absolute left-0 top-0 h-full bg-blue-500 rounded-full" style={{ width: `${(minesCount / 25) * 100}%` }}></span>
                    <span className="absolute top-0 right-0 px-2 text-gray-600">{minesCount} Mines</span>
                </div>

                <button onClick={resetGame} className="text-white h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">
                    Reset Game
                </button> 
            </div> 
        </>
    );
}