import './App.css';
console.clear()

const name = "nate"
let guhh:[boolean, string] = [true, name]

let zooweemama: meme
zooweemama = {
  name: "blah"
}
let weewee : meme = { 
  name: name,
  funny: 10 
  }

type meme = {
  name: string,
  funny?: number | string
}

let myfunnies: meme[] = [
  zooweemama, weewee, {name: "krabber patty", funny: "not funny???"}
]
console.log("this is a funny interpolated string and it uses \` so cool i think")

//let printFunny : (funny: meme | meme[] ) => void

let printFunny = (funny: meme | meme[]) =>
{
  if (funny instanceof Array)
  {
    funny.forEach(e => 
    { 
      console.log(`In your list of funnies, here is a funny: 
      ${e.name}, 
      ${e.funny ?? "no funny"}. 
      The funny score is a ${typeof(e.funny)}`) 
    })
  }
  else
  {
    console.log(`Here is the funny: 
        ${funny.name}, 
        ${funny.funny ?? "no funns"}. 
        The funny score is a ${typeof(funny.funny)})}`)
  }
}
console.log(typeof weewee)
console.log(typeof myfunnies)

printFunny(myfunnies)

function App() {
  return (
    <div className="App">Hello World!</div>
  )
}

export default App
