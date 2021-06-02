import * as React from "react"
import "../index.css"
import tw from "twin.macro"

import Layout from "../components/layout"
import ContentContainer from "../components/contentContainer"
import { ProseContainer, H1 } from "../components/styles"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <ContentContainer>
        <ProseContainer>
          <H1>
            Hi, I'm Noel &nbsp; <span tw="font-normal text-4xl">(☉‿☉✿)</span>
          </H1>
          <p tw="mt-8 text-xl text-gray-600 leading-8">
            I'm a career-shifting fullstack dev hopeful, with a specific
            interest in building data-centric web solutions that helps
            animated_variable get things done. &nbsp; ͡ಸ‿ಸ
          </p>

          <p tw="mt-8 text-xl text-gray-600 leading-8">
            I'm a career-shifting fullstack dev hopeful, with a specific
            interest in building data-centric web solutions that helps
            animated_variable get things done. &nbsp; ͡ಸ‿ಸ
          </p>
        </ProseContainer>
      </ContentContainer>
    </Layout>
  )
}

export default IndexPage
