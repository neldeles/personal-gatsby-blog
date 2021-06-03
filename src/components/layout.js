import React from "react"
import { GlobalStyles } from "twin.macro"
import Header from "./header"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
deckDeckGoHighlightElement()

const Layout = ({ children }) => {
  return (
    <div>
      <GlobalStyles />
      <Header />
      {children}
    </div>
  )
}

export default Layout
