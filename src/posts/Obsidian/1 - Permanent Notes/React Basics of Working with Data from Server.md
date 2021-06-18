# React Basics of Working with Data from Server
We can use the `get` method from the `axios` library which returns a `promise`. If the `promise` is fulfilled, the callback function returns a `response` object which contains the data from the server.

```js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {  
	const [notes, setNotes] = useState([])  
	const [newNote, setNewNote] = useState('')
  	const [showAll, setShowAll] = useState(true)
	
	const hook = () => {
		console.log('effect')    
		axios      
			.get('http://localhost:3001/notes')      
			.then(response => {        
				console.log('promise fulfilled')
				setNotes(response.data)      
			})  
	}
	
  	useEffect(hook, [])  
	console.log('render', notes.length, 'notes')
  	// ...
}
```
The console.log outputs give us an idea of the flow:
```js
render 0 notes
effect
promise fulfilled
render 3 notes
```
1. Component rendered for first time and no data fetched from server yet.
2. `Effect` function is executed immediately after rendering.
3. When data arrives from server, `promise` is fulfilled.
4. State-updating function updates the state, re-rendering the component (we now have 3 notes)

## Modification of Data in the Server
[[202101251905 - Modifying data stored in json-server]]

Footer
---
Source:
Keywords: #programming #react 
Related: 
- [[React MOC]]
- [[202101230525 - React Effect Hooks]]