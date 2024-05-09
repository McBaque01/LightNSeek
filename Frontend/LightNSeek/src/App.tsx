import { useState, useRef } from 'react';




function App() {

  interface DisplayerPropsTypes {
  
    sequence: number[];
  }

  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const ParentRef = useRef<HTMLDivElement | null>(null);
  // const [pick, setPick] = useState<boolean>(false);
 
  const [onDisplay, setOnDisplay] = useState<boolean>(false);
  
  const [Typing, setTyping] = useState<boolean>(false);
  // const [sequence, setSequence] = useState<number[]>([])
  const [round, setRound] = useState<number>(1)
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);

  const [countdown, setCountdown] = useState(3);
  const [isPlaying, setPlaying] =useState<boolean> (false)

  const handleVercelError = () => {
   setOnDisplay(true)
 
   handleVercelError();
  }

  const handleMatch = () => {
    const isMatch = sequence.length === playerSequence.length && sequence.every((value, index) => value === playerSequence[index])
    console.log(isMatch)
    
    if (isMatch) {
      setPlayerSequence([]);
      setRound(prev=>prev+1)
    
      handleNextRound();
    } else {
      setPlayerSequence([])
      setSequence([]);
      setRound(1);
      setCountdown(3);
      setPlaying(false)
    }

    return isMatch;
  }

  const handleMouseEnter = () => {
    if (!isPlaying) return; // Disable the event handler if not playing
    setTyping(true);
    // Any other logic when mouse enters
  };

  const handleMouseLeave = () => {
    if (!isPlaying) return; // Disable the event handler if not playing
    setTyping(false);
    setOnDisplay(false);
    handleMatch();
    // Any other logic when mouse leaves
  };

  // const handleIsWin = (sequence: number[], playerSequence:number[]) => {
  //     console.log(sequence, "SEQUENCE")
  //     console.log(playerSequence, "PLAYERSEQUENCE")
  //   const result = sequence == playerSequence ? true: false;
  //   console.log(result)
  //   return result;
  // }
   
//   let playerSequence: number[] = [];
//  let sequence: number[] = []
  // const round: number = 1


  // const handleClick = () => {
  //   let randomNumber = getRandomInt(0, 8)
  //   setSequence((prev)=>[...prev, randomNumber] )
  //   // sequence.push(randomNumber);
  //     console.log(sequence, "Sequence")



  //     // const countdownTimeout = setTimeout(() => {
  //     //     const countdownInterval = setInterval(() => {
  //     //       if (time > 0) {
  //     //         setTime(prevTime => prevTime - 1);
  //     //         console.log(countdownTimeout)
  //     //       }
  //     //     }, 1000);
    
  //     //     setTimeout(() => {
  //     //       clearInterval(countdownInterval);
  //     //     handleDisplayer({sequence})
  //     //     }, time * 1000); // Executes handleClick after the countdown finishes
  //     //   }, 0); // Start the countdown after 2 seconds

      
  //     // handleDisplayer({sequence});
  // }

  // const handleClick = () => {
  //   let randomNumber = getRandomInt(0, 8);
  //   setSequence(prev => [...prev, randomNumber]);
  // };

  // const handleStart = () => {
  //   // Countdown logic
  //   const countdownInterval = setInterval(() => {
  //     setCountdown(prevCountdown => prevCountdown - 1);
  //   }, 1000);

  //   // After 3 seconds, call handleDisplayer
  //   setTimeout(() => {
  //     clearInterval(countdownInterval); // Stop the countdown
  //     handleDisplayer({ sequence });
  //   }, 3000);
  // };

  const handleStart = () => {

    setPlaying(true);
    // Countdown logic
    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    // After 3 seconds, generate sequence and call handleDisplayer
    setTimeout(() => {
      clearInterval(countdownInterval); // Stop the countdown
      const randomNumber = getRandomInt(0, 8);
      const updatedSequence = [...sequence, randomNumber];
      setSequence(updatedSequence);
      handleDisplayer({ sequence: updatedSequence });

    }, 3000);

  };

  const handleNextRound = () => {

    const randomNumber = getRandomInt(0, 8);
    const updatedSequence = [...sequence, randomNumber];
    setSequence(updatedSequence);
    handleDisplayer({ sequence: updatedSequence });
  }
  

 

  const handleDisplayer =  ({sequence}:DisplayerPropsTypes) => {

    const parentElement = ParentRef.current;
    const childrens = parentElement ? (parentElement.children as HTMLCollectionOf<HTMLDivElement> | undefined) : undefined;
    
    setTimeout(() => {
    
      for (let i = 0; i < sequence.length; i++) {
        const index = sequence[i];
        setTimeout(() => {
            const current = childrens ? childrens[index] : undefined;
            console.log(current, "Current");
            if (current) {
                current.style.backgroundColor = "red";
                setTimeout(() => {
                    current.style.backgroundColor = ""; // Revert back to the original state
                    console.log(current, "AFTER");
                }, 500);
            }
        }, i * 600); // Delay each iteration by 1000 milliseconds
      }
     
      
    }, 1000);

    setOnDisplay(true)
    
  }


  // useEffect(() => {

  //   // handleDisplayer({sequence})
  // }, [sequence]);

  // useEffect(() => {
  //   console.log(sequence, "Sequence");
  //   let randomNumber = getRandomInt(0, 8);
  //   setSequence(prev => [...prev, randomNumber]);
  // }, [round]);

  
  // useEffect(() => {
  //   const countdownTimeout = setTimeout(() => {
  //     const countdownInterval = setInterval(() => {
  //       if (time > 0) {
  //         setTime(prevTime => prevTime - 1);
  //         console.log(countdownTimeout)
  //       }
  //     }, 1000);

  //     setTimeout(() => {
  //       clearInterval(countdownInterval);
  //       handleClick();
  //     }, time * 1000); // Executes handleClick after the countdown finishes
  //   }, 0); // Start the countdown after 2 seconds
     
  // }, []);
  
  console.log(Typing, "isTyping")
  console.log(onDisplay, "isDISPLAY")
  console.log(sequence, "Sequencee")
  console.log(playerSequence, "PlayerSeq")
  
  
  
  return (
    <div className="bg-slate-900 w-full h-screen justify-center items-center flex flex-col">
       <h1 className=' text-red-100 text-[4em]'>Round:{round}</h1>
      <h1 className=' text-red-100 text-[4em]'>{countdown === 0 ? 'START' : countdown}</h1>
     
      {/* Container for the three divs */}
      <div className='bg-green-400 p-1' 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    
      
      >
        <div className="bg-slate-900 w-fit h-fit gap-2 justify-center items-center grid grid-cols-3" ref={ParentRef}>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'  
              onClick={() => {
                if (onDisplay) {
                  setPlayerSequence(prev=>[...prev, 0])
                  console.log(playerSequence, "BUTTON CLICK");
                }
              }}
            >
              0
            </button>
          </div>
          
          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'  
              onClick={() => {
                if (onDisplay) {
                  setPlayerSequence(prev=>[...prev, 1])
                  console.log(playerSequence, "BUTTON CLICK");
                }
              }}
            >
              1
            </button>
          </div>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'  
              onClick={() => {
                if (onDisplay) {
                  setPlayerSequence(prev=>[...prev, 2])
                  console.log(playerSequence, "BUTTON CLICK");
                }
              }}
            >
              2
            </button>
          </div>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'  
              onClick={() => {
                if (onDisplay) {
                  setPlayerSequence(prev=>[...prev, 3])
                  console.log(playerSequence, "BUTTON CLICK");
                }
              }}
            >
              3
            </button>
          </div>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'  
              onClick={() => {
                if (onDisplay) {
                  setPlayerSequence(prev=>[...prev, 4])
                  console.log(playerSequence, "BUTTON CLICK");
                }
              }}
            >
              4
            </button>
          </div>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'  
              onClick={() => {
                if (onDisplay) {
                  setPlayerSequence(prev=>[...prev, 5])
                  console.log(playerSequence, "BUTTON CLICK");
                }
              }}
            >
              5
            </button>
          </div>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'  
              onClick={() => {
                if (onDisplay) {
                  setPlayerSequence(prev=>[...prev, 6])
                  console.log(playerSequence, "BUTTON CLICK");
                }
              }}
            >
              6
            </button>
          </div>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'  
              onClick={() => {
                if (onDisplay) {
                  setPlayerSequence(prev=>[...prev, 7])
                  console.log(playerSequence, "BUTTON CLICK");
                }
              }}
            >
              7
            </button>
          </div>
        


          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button 
              className='h-full w-full'  
              onClick={() => {
                if (onDisplay) {
                  setPlayerSequence(prev=>[...prev, 8])
                  console.log(playerSequence, "BUTTON CLICK");
                }
              }}
            >
              8
            </button>
          </div>

        </div>

        {/* <div style={{  }} className="bg-white w-[8em] h-[8em]" onClick={()=>{playerSequence.push(8),console.log(playerSequence)}}>8</div> */}
      </div>

      <button className=' text-red-100 text-[1.4em]' onClick={handleStart} 
      
      disabled={isPlaying === true}
      >Start</button>
    </div>
  );
}

export default App;