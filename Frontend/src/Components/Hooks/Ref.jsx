import React, { Fragment, useEffect, useRef, useState } from 'react'

const Ref = () => {
  // const [inputvalue, setInputValue] = useState();
  // const count = useRef()
  // const focusRef = useRef(null);
  const colorParagraph = useRef()
  const colors = ["#FF5733", "#33B5FF", "#8D33FF", "#33FF57", "#FFC733", "#FF33A6", "#2ECC71", "#34495E", "#E67E22","#9B59B6"]
  const selectedColor = useRef(null)
  // const onClickHandler = () => {
  //   focusRef.current.value = "This useRef function will work on render"
  //   focusRef.current.focus()
  //   console.log(focusRef);
    
  // }
  const styleParagraph = () => {
    const randomColor = Math.floor(Math.random()* colors.length)
    colorParagraph.current.style.color = colors[randomColor]

    selectedColor.current = colors[randomColor]
    console.log("Selected color",selectedColor.current);
    
  }

  useEffect(() => {
    // console.log(colorParagraph);
    console.log(colorParagraph.current);
  })

  useEffect(()=>{
    console.log("statement executed for selectedColor refhook changes");
    
  },[selectedColor.current])

  // const display = () => {
  //   console.log(count.current.value);
    
  // }
  return (
    <>
    {/* <h1>UseRef Example</h1>
    <input type="text" ref={count}/> 
    <button onClick={display}>Show Value</button>
    <h6>My name is:{count.current?.value}</h6> */}
    <Fragment>
        <div>
          <button onClick={() => {styleParagraph()}}>
              Click me
          </button> <br />
          <p ref={colorParagraph}>
            Click on the action button to focus and populate the text
          </p> <br />
          <textarea name="" id="" ></textarea>
        </div>
    </Fragment>
    </>
  )
}

export default Ref