import Layout from "@App/components/layoutTemplates/layout";
import { useEffect } from "react";

export default function About() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [])
  return (
    <Layout>
      About page 2
    </Layout>
  )
}