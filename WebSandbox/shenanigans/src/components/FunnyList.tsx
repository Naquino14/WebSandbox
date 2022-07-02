import React from 'react'
import { Funny } from './FunnyModel'
import './FunnyList.css'
import SingleFunny from './SingleFunny'

interface Props {
    funnies: Funny[]
    setFunnies: React.Dispatch<React.SetStateAction<Funny[]>>
}

const FunnyList : React.FC<Props> = ({funnies, setFunnies}) => {
  return <div className='funnies'>
    {funnies.map((funny) => (
        <SingleFunny funny={funny} key={funny.id} funnies={funnies} setFunnies={setFunnies}/>
    ))}
  </div>
}

export default FunnyList