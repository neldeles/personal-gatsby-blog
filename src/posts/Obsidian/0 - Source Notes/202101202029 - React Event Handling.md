# React Event Handling
In React an event handler is either a function or function reference; it **should not** be a function call.

Bad:
```js
<button onClick={setCounter(counter + 1)}> 
  plus
</button>
```
Good:
```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)    
  const setToZero = () => setCounter(0)
  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>        
	  	plus
      </button>
      <button onClick={setToZero}>        
	  	zero
      </button>
    </div>
  )
}
```



Footer
---
Source:
Keywords: #react 
Related: