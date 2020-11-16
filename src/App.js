import './App.css';
import React, { useState } from "react";
import List from "./list";
import Alert from "./alert";

function App() {
  const [name, setName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [alert, setAlert] = useState({show: false, msg: "", type: ""})
  const [list, setList] = useState([])
  const [editID, setEditID] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      //show alert
      showAlert(true, "please enter value", "success")
      
    }else if (name && isEditing) {
      //set List and editing
      setList(list.map((item) => {
        if (item.id === editID) {
          return {...item, title: name}
        }
        return item
        })
      )
      setName("")
      setEditID(null)
      setIsEditing(false)
      showAlert(true, "value changed", "success")
    }else{
      // add new list
      showAlert(true, "item added to the list", "success")
      const newItem = {id: new Date().getTime().toString(), title: name}
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show = false, msg = "item remove" , type = "danger") => {
    setAlert({show, msg, type})
  }

  const clearList = () => {
    showAlert(true , "Item Empty", "danger")
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, "item removed", "danger")
    //remove matched item
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    //list contain id and name only
    setName(specificItem.title)
  }

  return (
    <section className="section-center">

      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery bud</h3>
        <div className="form-control">
          <input type="text" className="grocery" placeholder="e.g. eggs" value={name} onChange={(e) => setName(e.target.value)}/>
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
    
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem= {editItem}/>
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
