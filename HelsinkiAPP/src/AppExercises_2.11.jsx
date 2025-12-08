import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const hook = ()=>{
    axios.get('http://localhost:3001/persons').then(response=>{
      console.log("promise fufilled")
      setPersons(response.data)
    })
  }
  useEffect(hook, [])

  console.log('render', persons.length, 'people')


  const AddName = (event) =>{
    event.preventDefault()
    console.log('button clicked', event.target, newName)
    if(persons.find(person => person.name === newName)){
        console.log("already exist")
        window.alert(`${newName} is already added to the phonebook`)
        return
    }
    else{
        console.log("name not found")
    }
    const newNameObject = {
        name:newName,
        number:newNumber,
    }
    setPersons(persons.concat(newNameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) =>{
    console.log("set new name", event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log("set new number", event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    console.log("set new filter", event.target.value)
    setFilter(event.target.value)
  }

  const peopleToShow =persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newValue = {filter} change={handleFilterChange}/>
     

      <h2>Add a new</h2>
      <NewPersonForm submit = {AddName} name = {newName} changeName = {handleNameChange} number ={newNumber} changeNumber = {handleNumberChange}/>

      <h2>Numbers</h2>
      <DisplayPeople people = {peopleToShow}/>

    </div>
  )
}

const Filter = (filterProps)=>{
  return(
  <div>
        filter: <input value={filterProps.newValue} onChange={filterProps.change}/>
  </div>
  )
}

const NewPersonForm = (personFormProps)=>{

  return(
    <form onSubmit={personFormProps.submit}>
        <div>
          name: <input value={personFormProps.name} onChange={personFormProps.changeName}/>
        </div>
        <div>
            number: <input value={personFormProps.number} onChange={personFormProps.changeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const DisplayPeople = (people)=>{
  return(
    <ul>
        {
          people.people.map(person =><PersonName key={person.name} person= {person}/>)
        }
      </ul>
  )
}

const PersonName = ({person}) =>{
    //console.log({person})
    return(<div>{person.name} {person.number}</div>)
}

export default App