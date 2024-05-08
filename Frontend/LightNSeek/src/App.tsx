import React, { useState, useEffect, useRef } from 'react';

function App() {

  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // const randomNumber = getRandomInt(0, 8);

  // console.log(randomNumber)

  const ParentRef = useRef<HTMLDivElement | null>(null);
  const [pick, setPick] = useState<boolean>(false);
  const [sequence, setSequence] = useState<number[]>([])
  const [playerSequence, setPlayerSequence] =  useState<number[]>([]);

  const handleClick = () => {
    let randomNumber = getRandomInt(0, 8);

    setSequence([...sequence, randomNumber])
      // sequence.push(randomNumber)
      console.log(sequence)
  }
  

  useEffect(()=>{


    const parentElement = ParentRef.current;
    const childrens = parentElement ? (parentElement.children as HTMLCollectionOf<HTMLDivElement> | undefined) : undefined;
    console.log(sequence, "first render")

      // for(let i = 0; i <  (childrens?.length ?? 0); i++){

      //   for(let j = 0;  j < sequence.length; j++){
      //     let current = childrens ? childrens[i] : undefined;
      //     if (current) {
      //       current.style.backgroundColor = "red";
      //       setTimeout(() => {
      //         current.style.backgroundColor = ""; // Revert back to the original state
      //       }, 1000);
      //     }
      //   }

      // }

      // for(let i = 0; i < sequence.length; i++){

      //   console.log(sequence[i],"S")
      //     let current = childrens ? childrens[sequence[i]] : undefined;
      //     console.log(current, "Current")
      //     if (current) {
      //       current.style.backgroundColor = "red";
      //       setTimeout(() => {
      //         current.style.backgroundColor = ""; // Revert back to the original state
      //         console.log(current, "AFTER")
      //       }, 1000);
      //     }
        

      // }

      // let randomNumber = getRandomInt(0, 8);
      // sequence.push(randomNumber)
      // console.log(sequence, "first")


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
        }, i * 700); // Delay each iteration by 1000 milliseconds
      }



    //   for(let i = 0; i <  sequence.length; i++){
    //     for(let j = 0; j < (childrens?.length ?? 0); j++){
    //       let current = childrens ? childrens[i] : undefined;
    //       console.log(current, "Current")
    //       if (current) {
    //         current.style.backgroundColor = "red";
    //         setTimeout(() => {
    //           current.style.backgroundColor = ""; // Revert back to the original state
    //           console.log(current, "AFTER")
    //         }, 1000);
    //       }
    //   }

    // }



      // for(let i = 0; i < sequence.length; i++){
      //   console.log(sequence[i])
      // }



      // const firstChild = childrens ? childrens[1] : undefined;
      // if (firstChild) {
      //   firstChild.style.backgroundColor = "red";
      //   setTimeout(() => {
      //     firstChild.style.backgroundColor = ""; // Revert back to the original state
      //     // console.log(firstChild.style.backgroundColor, "after")
      // }, 1000);
      // }

      // console.log(childrens);
      

  },[sequence])
  

  // useEffect(()=>{
  //   let randomNumber = getRandomInt(0, 8);

  //   sequence.push(randomNumber)
  //   // console.log(randomNumber)
  //   // console.log(sequence)
  //   console.log(sequence)

  // },[pick])

  console.log(playerSequence)
  
  return (
    <div className="bg-slate-900 w-full h-screen justify-center items-center flex ">
      {/* Container for the three divs */}
      <div className="bg-slate-900 w-fit h-fit gap-2 justify-center items-center grid grid-cols-3" ref={ParentRef}>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" onClick={()=>setPlayerSequence([...playerSequence, 0])} >0</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" onClick={()=>setPlayerSequence([...playerSequence, 1])}>1</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" onClick={()=>setPlayerSequence([...playerSequence, 2])}>2</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" onClick={()=>setPlayerSequence([...playerSequence, 3])}>3</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" onClick={()=>setPlayerSequence([...playerSequence, 4])}>4</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" onClick={()=>setPlayerSequence([...playerSequence, 5])}>5</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" onClick={()=>setPlayerSequence([...playerSequence, 6])}>6</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" onClick={()=>setPlayerSequence([...playerSequence, 7])}>7</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" onClick={()=>setPlayerSequence([...playerSequence, 8])}>8</div>
      </div>
      <button onClick={()=>handleClick()}>REPICK!</button>
    </div>
  );
}

export default App;