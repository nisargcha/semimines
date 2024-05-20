import React, { useEffect, useState } from 'react';
import diamond from './Images/diamond.png';
import bomb from './Images/bomb.png';

export default function NisargMine() {
    const [grid, setGrid] = useState(Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => ({ revealed: false, content: 'empty' }))));
    const [gameOver, setGameOver] = useState(false);
    const [minesCount, setMinesCount] = useState(1);
    const [diamondCount, setDiamondCount] = useState(0);

    useEffect(() => {
        generateMine();
    }, [minesCount]); 

    function generateMine() {
        let newGrid = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => ({ revealed: false, content: 'diamond' })));
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
        
        if (gameOver || grid[r][c].revealed) return;
    
        let newGrid = [...grid]; 
        newGrid[r][c].revealed = true;
    
        if (newGrid[r][c].content === 'bomb') {
            setGrid(newGrid);
            setTimeout(() => {
                newGrid.forEach(row => row.forEach(cell => cell.revealed = true));
                setGrid(newGrid); 
                alert("You hit a bomb! Game over. You lose.");
                setGameOver(true);
            }, 100);
        } else {
            setGrid(newGrid);
            setDiamondCount(prevCount => prevCount + 1);
            if (diamondCount + 1 === 25 - minesCount) {
                setTimeout(() => {
                    alert("You win");
                    setDiamondCount(0);
                    setGameOver(true);
                }, 100);
            }
        }
    }
    

    function handleInputChange(event) {
        setMinesCount(parseInt(event.target.value, 10));
    }

    function resetGame() {
        setGrid(Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => ({ revealed: false, content: 'empty' }))));
        setGameOver(false); 
        generateMine();
    }

    return (
        <>
            <div className='flex justify-center items-center w-full p-4'>
                <div className='grid grid-cols-5 gap-1 w-full max-w-xs sm:max-w-md lg:w-96 lg:h-96 lg:py-5 lg:px-5 bg-gray-800 border-black border-solid border-4'>
                    {grid.map((row, rowIndex) => (
                        <div key={rowIndex} className="contents">
                            {row.map((cell, colIndex) => (
                                <button
                                    key={`${rowIndex}-${colIndex}`}
                                    className='rounded-lg shadow-2xl w-full h-12 sm:h-16 lg:w-16 lg:h-16 border-solid border-black border-2 bg-gray-400 text-white transition duration-150 hover:scale-110 hover:shadow-2xl'
                                    onClick={() => {checkmine(rowIndex, colIndex)
                                    }}
                                    disabled={cell.revealed || gameOver}
                                >
                                    {cell.revealed && (
                                        <img src={cell.content === 'bomb' ? bomb : diamond} alt={cell.content} className='w-full h-full rounded-lg'/>
                                    )}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col justify-center items-center mt-6 px-4 lg:flex-row lg:justify-center lg:items-center lg:mx-96 lg:px-64 lg:py-3'>
                <div className="w-full max-w-xs sm:max-w-md lg:w-72 bg-gray-200 rounded-full h-8 flex items-center px-2 relative">
                    <input
                        type="range"
                        min="1"
                        max="24"
                        value={minesCount}
                        onChange={handleInputChange}
                        className="w-full h-full bg-transparent appearance-none outline-none z-10"
                    />
                    <span className="absolute left-0 top-0 h-full bg-blue-500 rounded-full" style={{ width: `${(minesCount / 24) * 100}%` }}></span>
                    <span className="absolute top-0 right-0 px-2 text-gray-600">{minesCount} Mines</span>
                </div>

                <button onClick={resetGame} className="text-white h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 lg:mt-0 lg:ml-4">
                    Reset Game
                </button> 
            </div>
        </>
    );
}
