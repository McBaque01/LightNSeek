import { useState, useEffect, useRef } from 'react';




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
  const [pick, setPick] = useState<boolean>(false);
 
  const [onDisplay, setOnDisplay] = useState<boolean>(false);
  const [time, setTime] = useState(4)
  
  let playerSequence: number[] = [];
  let sequence: number[] = []
  const round: number = 1
  const handleClick = () => {
    let randomNumber = getRandomInt(0, 8)
    

    sequence.push(randomNumber);
      console.log(sequence, "Sequence")
      handleDisplayer({sequence});
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
    
   
  }
  

  useEffect(()=>{
      setTimeout(() => {
       handleClick();
      }, 1000);
    
  },[]);
    
  
  return (
    <div className="bg-slate-900 w-full h-screen justify-center items-center flex flex-col">
      <h1 className=' text-red-100 text-[4em]'>ROUND: {round}</h1>
      <h1 className=' text-red-100 text-[4em]'>time:{time}</h1>
      {/* Container for the three divs */}
      <div className="bg-slate-900 w-fit h-fit gap-2 justify-center items-center grid grid-cols-3" ref={ParentRef}>
        <div style={{}} className="bg-white w-[8em] h-[8em] relative flex justify-center p-2w">
          <button className='h-full w-full'  
            onClick={() => {
              if (onDisplay) {
                playerSequence.push(0);
                console.log(playerSequence);
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
                playerSequence.push(1);
                console.log(playerSequence);
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
                playerSequence.push(2);
                console.log(playerSequence);
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
                playerSequence.push(3);
                console.log(playerSequence);
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
                playerSequence.push(4);
                console.log(playerSequence);
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
                playerSequence.push(5);
                console.log(playerSequence);
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
                playerSequence.push(6);
                console.log(playerSequence);
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
                playerSequence.push(7);
                console.log(playerSequence);
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
                playerSequence.push(8);
                console.log(playerSequence);
              }
            }}
          >
            8
          </button>
        </div>

        {/* <div style={{  }} className="bg-white w-[8em] h-[8em]" onClick={()=>{playerSequence.push(8),console.log(playerSequence)}}>8</div> */}
      </div>
      <button className=' text-red-100 text-[1.4em]' onClick={()=>handleClick()}>Start</button>
    </div>
  );
}

export default App;