import React from "react"
import { GlobalStyles } from "twin.macro"

import Header from "./header"

const Layout = ({ children, ...rest }) => (
  <div {...rest}>
    <GlobalStyles />
    <Header />
    {children}
  </div>
)

export default Layout
