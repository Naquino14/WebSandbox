import React from 'react'
import './App.css'
import Foot from './components/Foot'
import FunnyList from './components/FunnyList'
import { Funny } from './components/FunnyModel'
import InputField from './components/InputField'
import './GlobalFonts.css'


const App: React.FC = () => {
  // Now im gonna define a state by setting both of these variables?
  // this is a basic "hook"
  const [funny, setFunny] = React.useState<string>('')
  const [funnies, setFunnies] = React.useState<Funny[]>([])

  const addFunny = (e : React.FormEvent) => {
    e.preventDefault();

    if (funny)
    {
      setFunnies([...funnies, {id: funnies.length, funny: funny, isCringe: false}])
      setFunny('')
    }
  }

  console.log(funnies)

  return (
    <div className="App">
      <span className="heading">Funnyify</span>
      <InputField funny={funny} setFunny={setFunny} addFunny={addFunny}/> 
      {/* ok so this is really cool. 
      Its a JSX element defined in its 
      sown file and can be reused anywhere! */}
      <FunnyList funnies={funnies} setFunnies={setFunnies}/>
      <Foot/>
    </div>
    
  )
}

export default App
