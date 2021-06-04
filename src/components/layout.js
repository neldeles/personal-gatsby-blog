import { jsx } from "@emotion/react"
import React from "react"
import tw, { GlobalStyles } from "twin.macro"
import Header from "./header"
import Footer from "./footer"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
deckDeckGoHighlightElement()

const Layout = ({ children }) => {
  return (
    <div tw="flex flex-col h-screen">
      <GlobalStyles />
      <Header />
      <main tw="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
