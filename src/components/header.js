/** @jsx jsx */
import { jsx } from "@emotion/react"
import React from "react"
import { Link } from "gatsby"
import tw from "twin.macro"

const styles = {
  logo: tw`text-3xl font-black text-black mr-auto`,
  headerContainer: tw`mx-auto w-full`,
  header: tw`items-center bg-white flex max-w-7xl mx-auto px-8 py-0 h-24`,
  links: tw`p-4 text-base font-medium text-gray-500 hover:text-gray-900`,
}

const Header = () => {
  return (
    <div css={styles.headerContainer}>
      <div css={styles.header}>
        <Link to="/" aria-label="home" css={styles.logo}>
          neldeles
        </Link>
        <Link to="/blog" css={styles.links}>
          blog
        </Link>
        <Link to="/tags" css={styles.links}>
          tags
        </Link>
        <Link to="/contact" css={styles.links}>
          contact
        </Link>
        <Link to="/resume" css={styles.links}>
          resume
        </Link>
      </div>
    </div>
  )
}

export default Header
