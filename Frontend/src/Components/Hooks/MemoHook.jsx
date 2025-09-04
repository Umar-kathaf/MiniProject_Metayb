import React, { useMemo, useState } from 'react'

const MemoHook = () => {
    const [number, setNumber] = useState(1);

    const factorialOf =(num) => {
        console.log("inside factorial");
        let result = 1;

        if(num <= 1) {
            return result
        } else {
            for (let i = num; i >= 1; i--) {
                    result = result * i                
            }
            return result
        }
    }

    // const fact = factorialOf(number)
    const fact = useMemo(() => (factorialOf(number)), [number])
  return (
    <>
    <p>Find the factorial of the given number</p>
    <input type="text" placeholder='Enter the number' onChange={(e) => {setNumber(e.target.value)}} /> <br />
    <span>factorial of the given number is {fact}</span>
    </>
)
}

export default MemoHook