import { jsx } from "@emotion/react"
import React from "react"
import tw from "twin.macro"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const Tags = ({ tag, content }) => {
  return (
    <Link to={`/tags/${kebabCase(tag)}`} tw="font-normal ">
      <span tw="underline hover:(bg-pink-600 text-white cursor-pointer)">
        {tag}
      </span>
      {content}
    </Link>
  )
}

export default Tags
