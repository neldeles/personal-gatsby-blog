import * as React from "react"
import tw from "twin.macro"

import Layout from "../components/layout"
import ContentContainer from "../components/contentContainer"
import { ProseContainer, H1 } from "../components/styles"

const styles = {
  highlight: tw`bg-pink-600 text-white font-medium`,
  link: tw`underline font-medium hover:(bg-pink-600 text-white cursor-pointer)`,
}

const AboutPage = ({ data }) => {
  return (
    <Layout>
      <ContentContainer>
        <ProseContainer>
          <H1>About me</H1>

          <p tw="mt-8 text-xl text-gray-600 leading-8">
            I was previously a Fraud Analyst/Customer Protection Head at
            Coins.ph, one of the first and leading blockchain-backed e-wallets
            in Southeast Asia.
          </p>
          <p tw="mt-8 text-xl text-gray-600 leading-8">
            I then moved on to Ninjavan Philippines as the 2nd employee, helping
            the company scale from 10's of parcels a day to 100's of thousands a
            day. I made the rounds as Unit Head for different departments, until
            I found my footing as the Senior Business Intelligence Manager.{" "}
            <br />
            <br />
            Worked mostly with Python, Jupyter notebooks Redshift, Presto, and
            mySQL during this time, along with different Data Viz platforms. It
            was here wherein I developed my affinity for building data-centric
            tools.
            <br />
            <br />
            I'm now looking to focus on it full-time, hence the hopeful
            career-shift. Looking for fullstack positions to hone the
            foundations, and eventually specialize in more data-centric roles
            i.e. ML/Data Engineers and the like.
          </p>
          <div tw="mt-10 prose prose-pink prose-lg text-gray-500 mx-auto">
            <p>
              Here's a list of current skills/tools I use or am familiar with:
              <ul>
                <li>HTML, CSS, JavsScript, Python, Postgresql</li>
                <li>React, Express, Node, Django</li>
                <li>
                  <a
                    href="https://github.com/ben-rogerson/twin.macro"
                    css={styles.link}
                  >
                    Twin.Macro
                  </a>
                </li>
                <li>
                  <a href="https://tailwindcss.com/" css={styles.link}>
                    TailwindCSS
                  </a>
                </li>
              </ul>
            </p>
            <p>
              For those curious, I built this blog using Gatsby, TailwindCSS,
              and Twin.Macro.
            </p>
          </div>
        </ProseContainer>
      </ContentContainer>
    </Layout>
  )
}

export default AboutPage
