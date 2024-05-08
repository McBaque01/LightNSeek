import React, { useState, useEffect, useRef } from 'react';

function App() {

  const ParentRef = useRef<HTMLDivElement | null>(null);
  const sequence = [2,1,2,0,1];

  useEffect(()=>{

    
    const parentElement = ParentRef.current;
    const childrens = parentElement ? (parentElement.children as HTMLCollectionOf<HTMLDivElement> | undefined) : undefined;

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
                }, 1000);
            }
        }, i * 1000); // Delay each iteration by 1000 milliseconds
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

  },[])

  useEffect(()=>{
    
  })
  
  return (
    <div className="bg-slate-900 w-full h-screen justify-center items-center flex ">
      {/* Container for the three divs */}
      <div className="bg-slate-900 w-fit h-fit gap-2 justify-center items-center grid grid-cols-3" ref={ParentRef}>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" >0</div>
        <div style={{ }} className="bg-white w-[8em] h-[8em]" >1</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" >2</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" >3</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" >4</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" >5</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" >6</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" >7</div>
        <div style={{  }} className="bg-white w-[8em] h-[8em]" >8</div>
      </div>
    </div>
  );
}

export default App;