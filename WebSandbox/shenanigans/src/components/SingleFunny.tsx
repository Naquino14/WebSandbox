import React, { useEffect, useRef } from 'react'
import './SingleFunny.css'
import { Funny } from './FunnyModel'
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsHandThumbsDown } from 'react-icons/bs'

interface Props
{
    funny: Funny
    funnies: Funny[]
    setFunnies: React.Dispatch<React.SetStateAction<Funny[]>>
}

const SingleFunny: React.FC<Props> = ({funny, funnies, setFunnies}) => {

  // edit mode needs two states to track if we are editing or not, and the state of the text
  const [editMode, setEditMode] = React.useState<boolean>(false)
  const [editFunnyText, setFunnyText] = React.useState<string>(funny.funny)

  const handleCringe = (id: number) =>
  {
    setFunnies(funnies.map(
      (funny) => funny.id === id ? {...funny, isCringe: !funny.isCringe} : funny
      ))
  }

  const handleTrash = (id: number) =>
  {
    setFunnies(funnies.filter(
      (funny) => funny.id !== id
      ))
  }

  const handleFunnyEdit = (e: React.FormEvent, id: number) =>
  {
    e.preventDefault()
    setFunnies(funnies.map((funny) => funny.id === id ? {...funny, funny: editFunnyText} : funny))
    /// btw ... is the spread operator, which basically edits the value of a cetain key in an object
    setEditMode(false)
  }

  const funnyEditRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (editMode)
      funnyEditRef.current?.focus()
  }, [editMode])
  // basically, this is a hook that runs when editMode changes
  // and it focuses on the input field, very very interesting

  return (
    <form className='funnies_single' onSubmit={(e) => handleFunnyEdit(e, funny.id)}>
      
      { // conditional block for wether edit mode is on or not
        editMode ? (
          <input value={editFunnyText} onChange={(e) => setFunnyText(e.target.value)} className='funnies_single_edit' ref={funnyEditRef}></input>
        ) : (
          // conditional block for wether a strikethru is rendered or not
          funny.isCringe ? (
            <div>
              <s className='funnies_single_text'>{funny.funny}</s><span className='funnies_single_text_label'>...CRINGE!</span>
            </div>
          ) : (
            <span className='funnies_single_text'>
            {funny.funny}
            </span>
          )
        )
      }
        <div className='funnies_single_icons'>
            <span className='funnies_single_icon' onClick={() => 
            {
              if (!editMode && !funny.isCringe)
                setEditMode(!editMode)
            }}><AiOutlineEdit/></span>
            <span className='funnies_single_icon' onClick={()=>{handleCringe(funny.id)}}><BsHandThumbsDown/></span>
            <span className='funnies_single_icon' onClick={() => {handleTrash(funny.id)}}><AiOutlineDelete/></span>
        </div>
    </form>
  )
}

export default SingleFunny