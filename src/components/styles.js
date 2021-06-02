import { jsx } from "@emotion/react"
import React from "react"
import tw, { styled } from "twin.macro"
import { Link } from "gatsby"

const styles = {
  listLink: tw`block text-lg text-pink-600 underline font-medium hover:(cursor-pointer)`,
}

export const ProseContainer = tw.div`max-w-prose mx-auto`

export const H1 = tw.h1`
  mt-2 mb-1.5 block text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl
`

export const ListLink = ({ content, destination }) => (
  <Link to={destination} css={styles.listLink}>
    {content}
  </Link>
)

export const ListA = styled.a(() => [styles.listLink])
