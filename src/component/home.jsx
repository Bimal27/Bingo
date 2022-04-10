import { useState} from "react";

import Confetti from "react-confetti";

const Home = (props) => {
    const { user, arr } = props;
    
    const  [selectedList, setSelectedList] = useState([]);
    const [columnCounter, setColumnCounter] = useState([]);
    const  [rowCounter, setRowCounter] = useState([]);
    const  [diagonalCounter, setDiagonalCounter] = useState([])
    const [confettiStatus, setConfettiStatus] = useState(false);
    const [score,setScore] = useState(0)
    const [color,setColor] = useState('')
  

    let row = [];
    let inc = 0;
    for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
        if (x === 2 && y === 2) {
     
        row.push(
            <button className="central-button bingo-button">
               <span className="central-text">No value </span>
            </button>
        );
        } else {
        row.push(
            <button
            className={
                selectedList.length > 0 &&
                selectedList.includes(`${x}${y}`)
                ? "selected-button"
                : "bingo-button"
            }
            onClick={() => {clickedCoordinates(x,y);onSelect()}}
            >
            {arr[inc]}
            </button>
        );
        }
        inc++;
    }
    }
    const onSelect = ()=>{
      setColor({bgColor: 'rgb(13, 181, 233)'})
    }

    const clickedCoordinates = (x, y) => {
        selectedList.length > 0 && selectedList.includes(`${x}${y}`)
            ? removeFromThelist(`${x}${y}`,x, y)
            : addInThelist(`${x}${y}`,x,  y);
    }

    const addInThelist = (val,x, y) => {

        let tempList = selectedList;
        tempList.push(val)
        setSelectedList(tempList);
        let tempColumnlist = columnCounter;
        tempColumnlist.push(y);
        setColumnCounter(tempColumnlist);
        let tempRowlist = rowCounter;
        tempRowlist.push(x);
        setColumnCounter(tempColumnlist);

        let tempDiagonallist = diagonalCounter;
        tempDiagonallist.push(x,y);
        setDiagonalCounter(tempDiagonallist);

        checkRow(x);
        checkColumn(y);
        checkDiagonal(x,y)

    }

    const removeFromThelist = (val,x, y) => {
        let tempList = selectedList.filter(v => v !== val)
        setSelectedList(tempList)
    }

    const checkRow = (x) => { 
        let l = rowCounter.filter(r => r === x).length;
        if(l === 5){
          setConfettiStatus(true);
          setScore(score+1)
        } 
        setTimeout(() => {
          setConfettiStatus(false);
        }, 20000);
        
    }

    const checkColumn = (y) => {
         let l = columnCounter.filter((r) => r === y).length;
         if(l === 5){
          setConfettiStatus(true);
          setScore(score+1)
        } 
        setTimeout(() => {
            setConfettiStatus(false);
        }, 10000);
    };

    
     const checkDiagonal = (x,y) => {
      if(x===y && diagonalCounter.length >= 8){
        setConfettiStatus(true);
         setScore(score+1)

      }  
          setTimeout(() => {
            setConfettiStatus(false);
        }, 10000);
    };
  

  return (
    <div className="bingo">
      <div className="header">Select/Click the number to play Bingo {user}. Your score is <button className="score">{score}</button> .</div>
      <div>
        {confettiStatus && <Confetti width={"1500"} height={"1000"} />}
        {row && <div>{row}</div>}
      </div>
    </div>
  );
};

export default Home
