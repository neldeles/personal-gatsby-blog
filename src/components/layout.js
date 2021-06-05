import React from "react"
import tw, { GlobalStyles } from "twin.macro"
import Header from "./header"
import Footer from "./footer"

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
