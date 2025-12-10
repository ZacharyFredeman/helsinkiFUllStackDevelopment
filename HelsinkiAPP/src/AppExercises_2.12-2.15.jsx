import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const hook = ()=>{
    phonebookService.getAll()
    .then(intialPeople => {setPersons(intialPeople)})
  }
  useEffect(hook, [])

  const AddName = (event) =>{
    event.preventDefault()
    console.log('button clicked', event.target, newName)
    const person = persons.find(person => person.name === newName)
    if(person){
      console.log("already exist")
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const changedPerson = {...person, number: newNumber}
        phonebookService.update(person.id, changedPerson)
        .then(returnedPerson =>{
          setPersons(persons.map(uperson=> uperson.id === person.id ? returnedPerson : uperson))
          setNewName('')
          setNewNumber('')
        })
        return
      }
      else{
        return
      }
    }
    else{
      console.log("name not found")
    }
    const newNameObject = {
      name:newName,
      number:newNumber,
    }

    phonebookService.create(newNameObject).then(personCreated =>{
      setPersons(persons.concat(personCreated))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleNameChange = (event) =>{
    //console.log("set new name", event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    //console.log("set new number", event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    //console.log("set new filter", event.target.value)
    setFilter(event.target.value)
  }
  
  const deletePersonFromPhoneBook = (id) =>{
    console.log('delete person')
    const personToDelete = persons.find(person => person.id == id)
    if(window.confirm(`Delete '${personToDelete.name}' ?`)){
      phonebookService.deletePerson(personToDelete.id)
      .then(returnedData =>{
        //console.log(returnedData)
        phonebookService.getAll()
        .then(intialPeople => {setPersons(intialPeople)})
      })
      .catch(error=>{
        alert(`the note '${personToDelete.content}' was already deleted from the server`)
        //s(notes.filter(n => n.id !== id))
      })
    }
    else{
      return
    }
  }


  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newValue = {filter} change={handleFilterChange}/>
     
      <h2>Add a new</h2>
      <NewPersonForm submit = {AddName} name = {newName} changeName = {handleNameChange} number ={newNumber} changeNumber = {handleNumberChange}/>

      <h2>Numbers</h2>
      <div>
        {
          peopleToShow.map(person =><PersonInfo key={person.name} person= {person} deletePerson={()=>deletePersonFromPhoneBook(person.id)}/>)
        }
      </div>
      
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

const PersonInfo = ({person, deletePerson}) =>{
    //console.log({person})
    return(
    <div>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </div>
    )
}

export default App