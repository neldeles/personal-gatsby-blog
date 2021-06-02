import { jsx } from "@emotion/react"
import React from "react"
import tw from "twin.macro"

// Components
import Layout from "../components/layout"
import ContentContainer from "../components/contentContainer"

const Contact = () => {
  return (
    <Layout>
      <ContentContainer>
        <div tw="max-w-prose mx-auto">
          <h1 tw="mt-2 mb-1.5 block text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Contact
          </h1>
          <ul>
            <li tw="list-disc mt-6">
              <a tw="block text-lg text-pink-600 underline font-medium hover:(cursor-pointer)">
                email
              </a>
              <li>
                <a href="https://twitter.com/neldeles">twitter</a>
              </li>
            </li>
          </ul>
        </div>
      </ContentContainer>
    </Layout>
  )
}

export default Contact
