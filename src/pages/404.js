import * as React from "react"

import Layout from "../components/layout"
import ContentContainer from "../components/contentContainer"

import { ProseContainer, H1 } from "../components/styles"

const NotFoundPage = () => (
  <Layout>
    <ContentContainer>
      <ProseContainer>
        <H1>404: Not Found (✖╭╮✖)</H1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </ProseContainer>
    </ContentContainer>
  </Layout>
)

export default NotFoundPage
