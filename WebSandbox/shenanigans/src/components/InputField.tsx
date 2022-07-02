import React, { useRef } from 'react'
import './InputField.css'

// this defines the shape of the that the element can have 
interface Props {
    // this is the state of the element
    funny: string, 
    // this is the function that will change the state of the element
    setFunny: React.Dispatch<React.SetStateAction<string>>
    // thats a little annoying to type... 
    // maybe theres an easier way?
    addFunny: (e: React.FormEvent) => void
}
// a little confusing but we will make it

// as you can see, the tuple is defined as the Props interface
// and is passed in as an argument to the function from the element
// hypothetically in C# this will look like this:
// internal readonly React.FC<Props> InputField((string funny, React.Dispatch<React.SetStateAction<string>> setFunny) Prop) {}
const InputField: React.FC<Props> = ({funny, setFunny, addFunny}) => {
  // referencing the input field html element
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form className='input' onSubmit={(e) => {
      addFunny(e)
      // this tutorial is so bad
      // man literally said the nullable had to do with the useref parameter...
      inputRef.current?.blur()
    }}>
        <input
            ref={inputRef}
            type='input' 
            value={funny}
            onChange={(e) => setFunny(e.target.value)}
            placeholder='Enter a funny' 
            className='input_box'></input>
        <button className='input_submit'><span className='input_label'>Yuh!</span></button>
    </form>
  )
}

export default InputField