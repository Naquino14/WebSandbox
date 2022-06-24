import React from 'react'
import './App.css'
import Foot from './components/Foot'
import InputField from './components/InputField'
import './GlobalFonts.css'


const App: React.FC = () => {
  // Now im gonna define a state by setting both of these variables?
  // this is a basic "hook"
  const [funny, setFunny] = React.useState<string>('');
  
  return (
    <div className="App">
      <span className="heading">Funnyify</span>
      <InputField funny={funny} setFunny={setFunny}/> 
      {/* ok so this is really cool. 
      Its a JSX element defined in its 
      sown file and can be reused anywhere! */}
      <Foot/>
    </div>
    
  )
}

export default App
