import React from "react"
import { Link } from "gatsby"
import tw from "twin.macro"
import TwitterIcon from "../assets/twitter.inline.svg"
import GithubIcon from "../assets/github.inline.svg"

const styles = {
  svg: tw`fill-current text-gray-200 inline-block m-2 hover:(text-pink-500)`,
  footer: tw`mx-auto w-full flex items-center px-8 py-8 max-w-7xl`,
  text: tw`text-gray-200`,
  links: tw`text-base font-medium text-pink-500 underline hover:(cursor-pointer)`,
}

const Footer = () => {
  return (
    <div tw="mx-auto w-full bg-black">
      <footer css={styles.footer}>
        <div tw="mr-auto">
          <p css={styles.text}>Designed and developed by Noel.</p>
          <p css={styles.text}>
            Built with{" "}
            <a href="https://gatsbyjs.com" css={styles.links}>
              Gatsby
            </a>
            ,{" "}
            <a href="https://tailwindcss.com" css={styles.links}>
              TailwindCSS
            </a>
            , and{" "}
            <a
              href="https://github.com/ben-rogerson/twin.macro"
              css={styles.links}
            >
              Twin.Macro
            </a>
            .
          </p>
        </div>
        <nav>
          <a href="https://twitter.com/neldeles" aria-label="Twitter">
            <TwitterIcon css={styles.svg} width="20" height="20" />
          </a>
          <a href="https://github.com/neldeles" aria-label="GitHub">
            <GithubIcon css={styles.svg} width="20" height="20" />
          </a>
        </nav>
      </footer>
    </div>
  )
}

export default Footer
