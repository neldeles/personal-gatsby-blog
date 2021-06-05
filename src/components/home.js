import * as React from "react"
import tw from "twin.macro"
import TextLoop from "react-text-loop"
import { Link } from "gatsby"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"

import Layout from "./layout"
import ContentContainer from "./contentContainer"
import { ProseContainer, H1 } from "../components/styles"
import "../index.css"
import resume from "../downloads/resume.pdf"

deckDeckGoHighlightElement()

const styles = {
  highlight: tw`bg-pink-600 text-white font-medium`,
  link: tw`underline font-medium hover:(bg-pink-600 text-white cursor-pointer)`,
}

const Home = () => {
  return (
    <Layout>
      <ContentContainer>
        <ProseContainer>
          <H1>
            Hi, I'm Noel &nbsp; <span tw="font-normal text-4xl">(☉‿☉✿)</span>
          </H1>

          <p tw="mt-8 text-xl text-gray-600 leading-8">
            I'm a career-shifting fullstack dev hopeful, with a specific
            interest in building data-centric web solutions that help
            <br />
            <TextLoop interval={1500}>
              <span css={styles.highlight}>companies</span>
              <span css={styles.highlight}>organizations</span>
              <span css={styles.highlight}>people</span>
            </TextLoop>
            &nbsp;get things done. &nbsp; ͡ಸ‿ಸ
          </p>

          <p tw="mt-10 prose prose-pink prose-lg text-gray-500 mx-auto">
            Here are some links that might interest you:
            <ul>
              <li>
                <Link to="/tags/projects" css={styles.link}>
                  projects I've worked on
                </Link>
              </li>
              <li>
                <Link to="/about" css={styles.link}>
                  bio and work history
                </Link>
              </li>
              <li>
                <a href={resume} css={styles.link} download>
                  my resume if you want the above but in a traditional pdf
                  format
                </a>
              </li>
            </ul>
          </p>
        </ProseContainer>
      </ContentContainer>
    </Layout>
  )
}

export default Home
