---
date: 2021-06-05
tags: ["projects"]
title: "Budget App"
published: false
description: Blog post on project to follow.
---

New tools I've discovered or learned while building this project:

- [react-table](https://react-table.tanstack.com/)
- [react-datetime](https://github.com/arqex/react-datetime)
- [reselect library](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns#memoized-selectors)
- [Immer library](https://www.pluralsight.com/guides/deeply-nested-objectives-redux)
- 
## Reselect Library

Allows me to generate memoized selector functions for use with Redux

## Key Learnings while working on the `budget-table` branch

On this branch, I focused on the following:

- react-datetime to build out the date picker
- react-table to build out the table
- defining the Modal forms for creating a category group

For the date picker, I learned how to build a custom themed date Month-Year date picker.

For react-table, I learned how to build a custom themed table, the design pattern of lifting up state, and [[202106211913 - workaround for passing a Table ID of the child to a custom button defined in the `Column.Header` options of the parent]]. I also had to apply the *Reselect* library and use of Memoization here.

For defining the Modal, it was another application of lifting up state.

## Immer library
Encountered dealing with deeply nested states in a reducer for the first time. By using Immer, I can simplify this:

```js
const initState = {
    ...
}

export function rootLevelReducer(state, action){
    return {
        ...state,
        firstLevel: {
            ...state.firstLevel,
            secondLevel: {
                ...state.firstLevel.secondLevel,
                thirdLevel: {
                    ...state.firstLevel.secondLevel.thirdLevel,
                    property1: action.data
                }
            }
        }
    }
}
```

to this: 

```js
import produce from 'immer';

const initState = {
    ...
}

export function rootLevelReducer(state, action){
    return produce(state, draft => {
        draft.firstLevel.secondLevel.thirdLevel.property1 = action.data;

        // bonus, you can do array updated as well!
        // draft.firstLevel.secondLevel.thirdLevel.property2[index] = someData;
    });
}
```

## Reusable Modal Forms
While building the app, I eventually realised that the ModalForm component is something I will be reusing. This means that I had to design it such that it can accept any number of fields/inputs within the form. 

This is where I learned about:
- the `useRef` hook
- [passing props to `props.children`](https://medium.com/@justynazet/passing-props-to-props-children-using-react-cloneelement-and-render-props-pattern-896da70b24f6)
	- [render functions](https://frontarm.com/james-k-nelson/passing-data-props-children/#render-functions)

It's also important to note that there are 2 forms of the problem. If it's only the child (inner component) that will be using the prop, you can pass it to the child directly.

In code it'd look something like this:
```js
function Wrapper() {
const myName = "Justyna"
  return (
    <div>
      <OuterComponent>
        <InnerComponent name={myName} />
      </OuterComponent>
    </div>
  );
}
function OuterComponent(props) {
  return props.children
}
function InnerComponent(props) {
  return <div>{props.name}</div>;
}
export default Wrapper;
```

The second is passing a prop to parent.props.children from within the parent. This pattern is often used when the children may use some state that is contained in the parent i.e. headlessUI. 

Sticking with the same code example, `myName` can now only be found within `OuterComponent`. This will not work:
```js
import React from "react";
function Wrapper() {
  return (
    <div>
      <OuterComponent>
        <InnerComponent />
      </OuterComponent>
    </div>
  );
}
function OuterComponent(props) {
  const myName="Justyna"
  return (props.children props={myName});  // not gonna work ;<
}
function InnerComponent(props) {
  return <div>{props.name}</div>;
}
export default Wrapper;
```

There are 3 solutions I've read about: [cloning an element, render props](https://medium.com/@justynazet/passing-props-to-props-children-using-react-cloneelement-and-render-props-pattern-896da70b24f6), and [use of the Context Api](https://victorofoegbu.com/notes/pass-props-to-react-children-faq).

Context API is only recommended if it's a prop that's globally needed, i.e. components multiple levels wide and deep access it. For my usecase, I just needed to access the `useRef` hook inside of a modal form component, so that my `input` [component is always in focus when the modal opens](202106210019-no-focusable-elements-inside-the-focus-trap-error.md). 

This is what the solution looks like:
```diff
const Wrapper = () => {
	// your renderFunction replaces the child components nested between Parent
	// any child components you want rendered you add via your render function
+	const renderFunction = (parentRenderProps) => {
+    return (
+      <>
+        <Input
+          placeholder="Example Cat Meow"
+          ref={parentRenderProps}
+          required
+        />
+      </>
+    );
+  };

  return (
    <div>
      <ModalFormParent
+        render={renderFunction}
+      />
-     >
-      <Child />
-    </ModalFormParent>
    </div>
  );
};


const ModalFormParent = ({
-  children
+  render
}) => {
	const inputFieldRef = useRef(null);

  return (
    <ClassNames>
      {({ css }) => (
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            initialFocus={inputFieldRef}
            static
            tw="fixed z-10 inset-0 overflow-y-auto"
            open={open}
            onClose={setOpen}
          >
            // some code
							<div tw="mt-1 sm:ml-4 sm:w-3/4">
-               {children}
+								{render(inputFieldRef)}
							</div>
                  
          </Dialog>
        </Transition.Root>
      )}
    </ClassNames>
}
```

Render props is almost similar to the use of Function as Child Component. But there are subtle differences. These are elaborated on in [this article](https://americanexpress.io/faccs-are-an-antipattern/).

## Testing
Useful links relevant to the app:
- https://testingjavascript.com/lessons/react-test-drive-assertions-with-dates-in-react
- https://testingjavascript.com/lessons/react-test-drive-mocking-react-router-s-redirect-component-on-a-form-submission
- https://testingjavascript.com/lessons/react-test-drive-the-api-call-of-a-react-form-with-react-testing-library
- https://testingjavascript.com/lessons/react-test-drive-the-submission-of-a-react-form-with-react-testing-library
- https://testingjavascript.com/lessons/react-mock-http-requests-with-msw
- https://testingjavascript.com/lessons/react-use-generated-data-in-tests-with-tests-data-bot-to-improve-test-maintainability-ba3445b2
- https://testingjavascript.com/lessons/react-test-react-components-that-use-the-react-router-router-provider-with-creatememoryhistory-69d5f9ed

# Second Take

This app actually took me 2 tries. In the first attempt, it was a few months since having completed the [fullstackopen](fullstackopen.com) course. My mindset at the time was, "Okay. I know react. Let's build something." As you might expect, the attempt was all over the place. For example, I made components reusable by just adding one prop after another, until all use-cases were covered. This led to more and more headaches down the line as more use cases popped up. 

I came across Kent Dodd's Compound Components pattern...and that blew me away. I refactored my components and it was such a PITA trying to do so on these monolithic components of mine. After successfully doing it....I knew I needed a way to easily document what my components did. 

Read about Storybook...and it blew me away as well. Here was a tool that not only allowed you to easily document the live code your app uses, but also supercharged your workflow.

Its Component Driven Developoment approach to building out your app was eye-opening. A big problem I knew I had was how to simplify and manage the complexity of building a medium-sized app. I knew right away I could have saved so much time building my budget app if I had known about this tool and method earlier. 

Rather than go through another painful refactoring exercise, I decided to just start from scratch. This time taking advantage of Storybook + Chromatic + the more advanced React patterns I've picked up from Epic React.