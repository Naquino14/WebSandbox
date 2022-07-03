import React from 'react'
import { Funny } from './FunnyModel'
import './FunnyList.css'
import SingleFunny from './SingleFunny'

interface Props {
    funnies: Funny[]
    setFunnies: React.Dispatch<React.SetStateAction<Funny[]>>
}

const FunnyList : React.FC<Props> = ({funnies, setFunnies}) => {
  return <div className="container">
    <div className="funnies">
      <span className="funnies_heading">
        Funnies
      </span>
      {
        funnies.map((funny) => (
          funny.isCringe ? null : <SingleFunny funny={funny} key={funny.id} funnies={funnies} setFunnies={setFunnies}/>
        ))
      }
    </div>
    <div className="funnies_cringe">
      <span className="funnies_heading_cringe">
        Cringe
      </span>
      {
        funnies.map((funny) => (
            funny.isCringe ? <SingleFunny funny={funny} key={funny.id} funnies={funnies} setFunnies={setFunnies}/> : null
        ))
      }
    </div>
  </div>
}

export default FunnyList