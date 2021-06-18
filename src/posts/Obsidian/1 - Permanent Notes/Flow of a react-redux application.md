---
aliases:
- 'react-redux'
- 'react redux'
tags: ['redux']
references:
- 'https://betterprogramming.pub/understanding-the-flow-of-a-react-redux-application-4dc8c8da08c7'
---

# Flow of a `react-redux` application
## Core pieces of a react-redux application
- redux store
- components
- action creators
- actions
- reducers

## Flow of a `react-redux` application
![[1_2Ga4iOJs58AbXBw9c43yjw.png]]
Note that the flow is *unidirectional*— it only goes in one direction.

## Example Workflow
Let’s say that you have a very simple counter application. There is a button on the page that you can click to increment the counter, and the counter’s current value is displayed on the page as well.

The workflow looks like this:

1.  The counter value is held in the _store_.
2.  The button _component_ is connected to the _store_ so that when the user clicks the button, the `onClick` handler can trigger an _action creator_, which is a simple function that we’ll name `incrementCounter`.
3.  This `incrementCounter` _action creator_ then returns an _action_, which is a plain object that looks like: `{ type: INCREMENT_COUNTER }`.
4.  The _reducer_ then handles that action. The reducer knows that when it receives an action with the type `INCREMENT_COUNTER`, it needs to increase the value of the `counter` property in the state by one.
5.  The state in the _store_ is then updated, and the counter’s value goes from `0` to `1`.
6.  The counter display in the UI is connected to the _store_, so when the state changes, the UI updates to reflect those changes. So, the user now sees the value `1` on the screen.

If the user were to click the button again, this whole process would repeat, incrementing the counter value to `2`.

# Footer
---
Related:
- [[React MOC]]