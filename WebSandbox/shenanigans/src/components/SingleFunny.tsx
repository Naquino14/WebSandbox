import React from 'react'
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
  return (
    <form className='funnies_single'>
        <span className='funnies_single_text'>
            {funny.funny}
        </span>
        <div className='funnies_single_icons'>
            <span className='funnies_single_icon'><AiOutlineEdit/></span>
            <span className='funnies_single_icon'><BsHandThumbsDown/></span>
            <span className='funnies_single_icon'><AiOutlineDelete/></span>
        </div>
    </form>
  )
}

export default SingleFunny