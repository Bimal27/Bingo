import { useState } from "react";
import Particles from "react-tsparticles";
import Confetti from "react-confetti";

const Home = props => {
  const { user, arr } = props;
  const [selectedList, setSelectedList] = useState([]);
  const [columnCounter, setColumnCounter] = useState([]);
  const [rowCounter, setRowCounter] = useState([]);
  const [diagonalCounter, setDiagonalCounter] = useState([]);
  const [rightDiagonalCounter, setRightDiagonalCounter] = useState([]);
  const [confettiStatus, setConfettiStatus] = useState(false);
  const [score, setScore] = useState(0);
  const [color, setColor] = useState("");

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
            key={`${x}${y}`}
            className={
              selectedList.length > 0 && selectedList.includes(`${x}${y}`)
                ? "selected-button"
                : "bingo-button"
            }
            onClick={() => {
              clickedCoordinates(x, y);
              onSelect();
            }}
          >
            {arr[inc]}
          </button>
        );
      }
      inc++;
    }
  }
  const onSelect = () => {
    setColor({ bgColor: "rgb(13, 181, 233)" });
  };

  const clickedCoordinates = (x, y) => {
    selectedList.length > 0 && selectedList.includes(`${x}${y}`)
      ? removeFromThelist(`${x}${y}`, x, y)
      : addInThelist(`${x}${y}`, x, y);
  };

  const addInThelist = (val, x, y) => {
    let tempList = selectedList;
    tempList.push(val);
    setSelectedList(tempList);
    let tempColumnlist = columnCounter;
    tempColumnlist.push(y);
    setColumnCounter(tempColumnlist);
    let tempRowlist = rowCounter;
    tempRowlist.push(x);
    setColumnCounter(tempColumnlist);

    let tempDiagonallist = diagonalCounter;
    x === y && tempDiagonallist.push(x, y);
    setDiagonalCounter(tempDiagonallist);

    let tempRightDiagonallist = rightDiagonalCounter;
    x + y === 4 && tempRightDiagonallist.push(x, y);
    setRightDiagonalCounter(tempRightDiagonallist);

    checkRow(x);
    checkColumn(y);
    checkDiagonal(x, y);
    checkRightDiagonal(x, y);
  };

  const removeFromThelist = (val, x, y) => {
    let tempList = selectedList.filter(v => v !== val);
    setSelectedList(tempList);
  };

  const checkRow = x => {
    let l = rowCounter.filter(r => r === x).length;
    if (l === 5) {
      setConfettiStatus(true);
      setScore(score + 1);
    }
    setTimeout(() => {
      setConfettiStatus(false);
    }, 6000);
  };

  const checkColumn = y => {
    let l = columnCounter.filter(r => r === y).length;
    if (l === 5) {
      setConfettiStatus(true);
      setScore(score + 1);
    }
    setTimeout(() => {
      setConfettiStatus(false);
    }, 6000);
  };

  const checkDiagonal = (x, y) => {
    if (x === y && diagonalCounter.length === 8) {
      setConfettiStatus(true);
      setScore(score + 1);
    }
    setTimeout(() => {
      setConfettiStatus(false);
    }, 6000);
  };

  const checkRightDiagonal = (x, y) => {
    if (x + y === 4 && rightDiagonalCounter.length === 8) {
      setConfettiStatus(true);
      setScore(score + 1);
    }
    setTimeout(() => {
      setConfettiStatus(false);
    }, 6000);
  };

  return (
    <div className="bingo">
      <Particles
        id="tsparticles"
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true
            },
            modes: {
              bubble: { distance: 500, duration: 2, opacity: 0.8, size: 40 },
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.3 }
            }
          },
          particles: {
            color: { value: "#f3f" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
            },
            collisions: { enable: true },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { random: true, value: 5 }
          },
          detectRetina: true
        }}
      />
      <div className="header">
        Select/Click the number to play Bingo {user}. Your score is{" "}
        <button className="score">{score}</button> .
      </div>
      <div>
        {confettiStatus && <Confetti width={"1500"} height={"1000"} />}
        {row &&
          <div>
            {row}
          </div>}
      </div>
    </div>
  );
};

export default Home;
