import Layout from "@App/components/layoutTemplates/layout";
// import { client } from "@App/lib/sanity/sanity";
import { useLoaderData } from "@remix-run/react";

// export const loader = async () => {
//   const query = `*[_type == "post"]`;
//   const posts = await client.fetch(query);

//   return { posts };
// };

export default function Sanity() {
  const { posts } = useLoaderData();
  console.log('posts', posts)
  return (
    <Layout>
      <h1 className="h-[500px]">Posts</h1>
    </Layout>
  )
}