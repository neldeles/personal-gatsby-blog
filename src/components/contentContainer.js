import React from "react"
import "twin.macro"

const ContentContainer = ({ children }) => {
  return (
    <div tw="relative py-16 bg-white">
      <div tw="relative px-4 sm:px-6 lg:px-8 ">{children}</div>
    </div>
  )
}

export default ContentContainer
