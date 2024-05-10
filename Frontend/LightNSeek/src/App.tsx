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


  const [round, setRound] = useState<number>(1)
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);

  const [countdown, setCountdown] = useState(3);
  const [isPlaying, setPlaying] = useState<boolean> (false)
  const [isWin, setIsWin] = useState<boolean> (false)


  

  const handleWinDisplay = () =>{
    const parentElement = ParentRef.current;
    const childrens = parentElement ? (parentElement.children as HTMLCollectionOf<HTMLDivElement> | undefined) : undefined;

    if (childrens) {
      setTimeout(()=>{
       
        Array.from(childrens).forEach(child => {
            child.style.backgroundColor = "green";
        });

      },200)
      
     }
    
     setTimeout(()=>{
       if (childrens) {
        
         Array.from(childrens).forEach(child => {
             child.style.backgroundColor = ""; 
         });
       }
 
     },800)
     
   }


   const handleLoseDisplayer = () => {
    const parentElement = ParentRef.current;
    const childrens = parentElement ? (parentElement.children as HTMLCollectionOf<HTMLDivElement> | undefined) : undefined;

    if (childrens) {
      setTimeout(()=>{     
        Array.from(childrens).forEach(child => {
            child.style.backgroundColor = "red"; 
        });
      },200)
      
     }
    
     setTimeout(()=>{
       if (childrens) {    
         Array.from(childrens).forEach(child => {
             child.style.backgroundColor = ""; 
         });
       }
     },800)
    
   }


   const handleDisplayer =  ({sequence}:DisplayerPropsTypes) => {

    const parentElement = ParentRef.current;
    const childrens = parentElement ? (parentElement.children as HTMLCollectionOf<HTMLDivElement> | undefined) : undefined;

      let completedTimeouts = 0;
      
      setPlaying(false)
     
      setTimeout(() => {
      
        for (let i = 0; i < sequence.length; i++) {
          const index = sequence[i];
          setTimeout(() => {
              const current = childrens ? childrens[index] : undefined;
             
              if (current) {
                  current.style.backgroundColor = "red";
                  setTimeout(() => {
                      current.style.backgroundColor = ""; // Revert back to the original state
                    
                      completedTimeouts++; // Increment the counter
                      if (completedTimeouts === sequence.length) {
                          setPlaying(true); // Call setPlaying(true) when all timeouts are completed
                      }
                  }, 500);
              }
          }, i * 600); // Delay each iteration by 1000 milliseconds
        }
       
        
      }, 1000);
  
    
    }
  

  const handleMatch = (pSequence: number[]) => {
    const isMatch = sequence.length === pSequence.length && sequence.every((value, index) => value === pSequence[index])
   
    console.log(isMatch)
    return isMatch;
  }


  const handleClickBlink = (inputNumber: number) => {
    const parentElement = ParentRef.current;
    const childrens = parentElement ? (parentElement.children as HTMLCollectionOf<HTMLDivElement> | undefined) : undefined;

    const BlinkMe = childrens ? childrens[inputNumber] : null;

    if (BlinkMe) {
      BlinkMe.style.backgroundColor = "red";
      setTimeout(() => {
        BlinkMe.style.backgroundColor = ""; // Revert back to the original state
         
      }, 200);
  }

  }



  const handleClick = (inputNumber: number) => {

    

    handleClickBlink(inputNumber)


    console.log(inputNumber , "YOUR INPUT")

    const updatedSequence = [...playerSequence, inputNumber];
    setPlayerSequence(updatedSequence);
    console.log(updatedSequence,"PLAYER")
    console.log(sequence,"SEQUENCE")


    if(updatedSequence.length == sequence.length){
      if(handleMatch(updatedSequence)){
        handleWinDisplay();
        setPlayerSequence([])
        setRound(prev=>prev+1)
        handleNextRound();
        // handleWinDisplay();
        return "WIN"
      }else{
        handleLoseDisplayer();
        setPlayerSequence([])
        setSequence([]);
        setRound(1);
        setCountdown(3);
        setPlaying(false)
        setIsWin(false)
        return "LOSE"
      }
    }

    

  }



  const handleStart = () => {
    setIsWin(true);

    setPlaying(false)
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

    setCountdown(3)

  };

  const handleNextRound = () => {

    const randomNumber = getRandomInt(0, 8);
    const updatedSequence = [...sequence, randomNumber];
    setSequence(updatedSequence);
    handleDisplayer({ sequence: updatedSequence });
  }

 
  // console.log(sequence, "Sequencee")
  // console.log(playerSequence, "PlayerSeq")
  // console.log(isPlaying, "PLAYING?")
  
  // console.log(handleWinDisplay());
  
  return (
    <div className="bg-slate-900 w-full h-screen justify-center items-center flex flex-col">
       <h1 className=' text-red-100 text-[4em]'>Round:{round}</h1>
      <h1 className=' text-red-100 text-[4em]'>{countdown === 0 ? 'START' : countdown}</h1>
     
      
      <div className='bg-green-400 p-1' 
      

      >
        <div className="bg-slate-900 w-fit h-fit gap-2 justify-center items-center grid grid-cols-3" ref={ParentRef}>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'
             disabled={!isPlaying} 
              onClick={() => {handleClick(0)}}
             
            >
              0
            </button>
          </div>
          
          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'  
              disabled={!isPlaying} 
               onClick={() => {handleClick(1)}}
            >
              1
            </button>
          </div>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'
             disabled={!isPlaying} 
              onClick={() => {handleClick(2)}}
            >
              2
            </button>
          </div>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'
           disabled={!isPlaying} 
               onClick={() => {handleClick(3)}}
            >
              3
            </button>
          </div>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'  
              disabled={!isPlaying}  
               onClick={() => {handleClick(4)}}
            >
              4
            </button>
          </div>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'
              disabled={!isPlaying} 
               onClick={() => {handleClick(5)}}
            >
              5
            </button>
          </div>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full'
              disabled={!isPlaying}  
               onClick={() => {handleClick(6)}}
            >
              6
            </button>
          </div>

          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button className='h-full w-full' 

                disabled={!isPlaying}   
               onClick={() => {handleClick(7)}}
            >
              7
            </button>
          </div>
        


          <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
            <button 
              className='h-full w-full' 
              disabled={!isPlaying}  
              onClick={() => {handleClick(8)}}
            >
              8
            </button>
          </div>

        </div>

        {/* <div style={{  }} className="bg-white w-[8em] h-[8em]" onClick={()=>{playerSequence.push(8),console.log(playerSequence)}}>8</div> */}
      </div>

      <button className=' text-red-100 text-[1.4em]' onClick={handleStart} 
      
      disabled={isWin}
      >Start</button>
    </div>
  );
}

export default App;