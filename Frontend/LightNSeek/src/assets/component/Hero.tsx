import {useState, useRef} from 'react'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {

    const navigate = useNavigate()

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
    
      const [countdown, setCountdown] = useState(4);
      const [isPlaying, setPlaying] = useState<boolean> (false)
      const [isWin, setIsWin] = useState<boolean> (false)
      const [isCount, setIsCount] = useState<boolean>(false);
    
    
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
     
         },400)
         
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
         },1000)
        
       }
    
    
       const handleDisplayer =  ({sequence}:DisplayerPropsTypes) => {
        setIsCount(false);
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
                          current.style.backgroundColor = ""; 
                        
                          completedTimeouts++; // Increment the counter
                          if (completedTimeouts === sequence.length) {
                              setPlaying(true); 
                          }
                      }, 500);
                  }
              }, i * 600); 
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
            BlinkMe.style.backgroundColor = ""; 
             
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
        setIsCount(true);
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
    
        }, 4000);
    
        setCountdown(4)
    
      };
    
      const handleNextRound = () => {
    
        const randomNumber = getRandomInt(0, 8);
        const updatedSequence = [...sequence, randomNumber];
        setSequence(updatedSequence);
        handleDisplayer({ sequence: updatedSequence });
      }
    
    
      
      return (
        <div className="bg-slate-900 w-full h-screen justify-center items-center flex flex-col relative gap-4">
            <div className='h-fit w-fit absolute right-4 top-4' onClick={()=>{navigate('/')}}>
                <Icon icon="material-symbols:close-small-rounded" width="50" height="50" color='#e2e8f0' />
            </div>
          <h1 className=' text-slate-200 text-[4em]'>Round {round}</h1>
         
          <h1 className={`text-[#D75C37] text-[4em]  ${isCount ? 'block':'hidden'} absolute top-1/2 z-10 font-bold tracking-widest`} >{countdown === 1 ? 'START' : countdown - 1}</h1>
          
          <div className='p-1 relative  min-w-fit bg-white'>
           
            <div className="bg-slate-900 min-w-fit h-fit gap-2 justify-center items-center grid grid-cols-3 p-2" ref={ParentRef}>
    
              <div style={{}} className="bg-white w-[7em] h-[7em] relative flex justify-center p-2">
                <button className='h-full w-full'
                 disabled={!isPlaying} 
                  onClick={() => {handleClick(0)}}
                 
                >
                  
                </button>
              </div>
              
              <div style={{}} className="bg-white w-[7em] h-[7em] relative flex justify-center">
                <button className='h-full w-full'  
                  disabled={!isPlaying} 
                   onClick={() => {handleClick(1)}}
                >
                  
                </button>
              </div>
    
              <div style={{}} className="bg-white  w-[7em] h-[7em] relative flex justify-center">
                <button className='h-full w-full'
                 disabled={!isPlaying} 
                  onClick={() => {handleClick(2)}}
                >
                  
                </button>
              </div>
    
              <div style={{}} className="bg-white  w-[7em] h-[7em] relative flex justify-center">
                <button className='h-full w-full'
               disabled={!isPlaying} 
                   onClick={() => {handleClick(3)}}
                >
                  
                </button>
              </div>
    
              <div style={{}} className="bg-white  w-[7em] h-[7em] relative flex justify-center">
                <button className='h-full w-full'  
                  disabled={!isPlaying}  
                   onClick={() => {handleClick(4)}}
                >
                  
                </button>
              </div>
    
              <div style={{}} className="bg-white  w-[7em] h-[7em] relative flex justify-center">
                <button className='h-full w-full'
                  disabled={!isPlaying} 
                   onClick={() => {handleClick(5)}}
                >
                  
                </button>
              </div>
    
              <div style={{}} className="bg-white  w-[7em] h-[7em] relative flex justify-center">
                <button className='h-full w-full'
                  disabled={!isPlaying}  
                   onClick={() => {handleClick(6)}}
                >
                  
                </button>
              </div>
    
              <div style={{}} className="bg-white  w-[7em] h-[7em] relative flex justify-center ">
                <button className='h-full w-full' 
    
                    disabled={!isPlaying}   
                   onClick={() => {handleClick(7)}}
                >
                  
                </button>
              </div>
            
    
    
              <div style={{}} className="bg-white  w-[7em] h-[7em] relative flex justify-center">
                <button 
                  className='h-full w-full' 
                  disabled={!isPlaying}  
                  onClick={() => {handleClick(8)}}
                >
                  
                </button>
              </div>
    
            </div>
    
           
          </div>
    
          <button className={`text-slate-900 text-[1.6em] font-black bg-slate-200 px-8 ${isWin ? "hidden" : "block"}`}
            onClick={handleStart} 
            disabled={isWin}
          >START</button>
        </div>
      );
}
