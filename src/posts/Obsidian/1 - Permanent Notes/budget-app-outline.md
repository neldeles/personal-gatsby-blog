---
date: '2021-09-30T19:49:11'
tags: ['project', 'react', 'outline']
title: Budget App Outline
published: true
description:
aliases:
references:
---

# Budget App Outline

## V2

This being my first major project, I am outlining below in more detail the steps I took when building this app.

- [create project using `create-react-app`](Quick%20Start%20-%20React.md)
	- [setup absolute imports in CRA](202110151438-absolute-imports-in-create-react-app.md)
- [install Twin.macro + emotion](https://github.com/ben-rogerson/twin.examples/tree/master/cra-emotion)
- [enable Git](Quick%20Start%20-%20Initializing%20Git%20for%20a%20project.md)
- [install Storybook](Storybook.md#Initial%20Setup)
	- [configure Storybook for snapshot testing](202110121049-snapshot-testing-in-storybook.md)
- [install react-router-dom](React%20Router%20Library.md#Install%20the%20library)
	- we installed this right away to build out a `<Link/>` component
- [installed Tailwind forms](202110141545-checkbox-css-not-working.md)
	- installed this so we can stylize checkbox and other form elements
- created first Molecule, `LoginForm`
	- learned about [actions and prevent default](202110171449-actions-and-prevent-default.md)
- created first Screen, `LoginScreen.stories.js`
	- learned about and applied the [args composition](https://storybook.js.org/docs/react/workflows/build-pages-with-storybook) pattern when building screens
- [Setup Storybook for deployment to Chromatic](202110182144-deploying-storybook.md)
- [install MSW to setup our mock REST API for the browser](MSW-Setup.md)
	- install [Axios](202102190653%20-%20Axios%20Library.md) to [generate our HTTP requests which MSW will intercept for us ](msw-axios-react.md)
- define unit test for the [Input component](https://github.com/neldeles/budget-app-v2/blob/main/src/components/atoms/Input/Input.unit.test.js)
- define integration test for the LoginScreen
	- since this is our first test that makes an HTTP request, we need to setup MSW for Node


## Modal Form component

Trying to apply Kent Dodd's [compound components](202109061436-compound-components.md) pattern.

Old:
```jsx
<ModalForm
  open={walletModalOpen}
  setOpen={setWalletModalOpen}
  title="Create Wallet"
  confirmButtonValue="Submit"
  clearFields={[clearState]}
  actionCreator={addWallet(walletPayload)}
  render={renderFunction}
/>
```
Goal:
```jsx

//basic
<Modal>
  <ModalOpenButton>
    <button>Open Modal</button>
  </ModalOpenButton>
  <ModalContents aria-label="Modal label (for screen readers)">
    <ModalDismissButton>
      <button>Close Modal</button>
    </ModalDismissButton>
    <h3>Modal title</h3>
    <div>Some great contents of the modal</div>
  </ModalContents>
</Modal>

//refactored version
<Modal>
  <ModalOpenButton>
	<Button
	  variant="secondary"
	  onClick={() => console.log('opening the modal')}
	>
	  Register
	</Button>
  </ModalOpenButton>
  <ModalContents title="Register" aria-label="Registration form">
	<LoginForm
	  onSubmit={register}
	  submitButton={<Button variant="primary">Register</Button>}
	/>
  </ModalContents>
</Modal>
```

**Breakdown of the compound component:**
- Modal (contains state)
	- ModalContents
		- ModalContentsBase
			- ModalDialog
				- testing
	- ModalDismissButton
- ModalOpenButton
- Form
	- props
		- `onSubmit`
		- `submitButton`
		- `cancelButton`

**Implementation of the compound component**
- `<Modal>`
	- `<ModalOpenButton>`
		- will most likely put `<Button>` as child
	- `<ModalContents title=''/>`
		- `<Form />` (this is optional—user can put an image in the dialog if he wanted)
			- the `Input` component will use the `useModalForm` hook instead of `ModalForm`
			- `title` prop to be nested here
			- the `render` prop to be replaced by `Input` components and nested here

- Test outline
	- test child
		- child child test
			- cest
- outline

# Footer

---
	
Related: 