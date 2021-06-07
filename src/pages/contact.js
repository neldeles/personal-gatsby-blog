import { jsx } from "@emotion/react"
import React from "react"
import tw from "twin.macro"

// Components
import Layout from "../components/layout"
import ContentContainer from "../components/contentContainer"
import { ProseContainer, H1, ListA } from "../components/styles"

const Contact = () => {
  return (
    <Layout>
      <ContentContainer>
        <ProseContainer>
          <H1>Contact</H1>
          <ul tw="list-disc ml-6 text-left ">
            <li tw="mt-6">
              <ListA href="mailto:neldeles@gmail.com">email</ListA>
            </li>
            <li tw="mt-3">
              <ListA href="https://twitter.com/neldeles">twitter</ListA>
            </li>
          </ul>
        </ProseContainer>
      </ContentContainer>
    </Layout>
  )
}

export default Contact
