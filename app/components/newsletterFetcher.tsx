import { useFetcher } from '@remix-run/react'
import { useEffect, useRef } from 'react'

const NewsletterFetcher = () => {
  const newsletter = useFetcher();
  console.log('newsletter', newsletter.data)

  const ref = useRef<any>();

  useEffect(() => {
    if (newsletter.type === "done" && newsletter.data.ok) {
      //@ts-ignore
      ref.current.reset();
    }
  }, [newsletter]);

  return (
   <div>
     <newsletter.Form
       ref={ref}
       method="post"
       action="/newsletter"
     >
       <p>
         <input type="text" name="email" />{" "}
         <button
           type="submit"
           disabled={newsletter.state === "submitting"}
         >
           Subscribe
         </button>
       </p>

       {newsletter.type === "done" ? (
         newsletter.data.ok ? (
           <p>Thanks for subscribing!</p>
         ) : newsletter.data.error ? (
           <p data-error>{newsletter.data.error}</p>
         ) : null
       ) : null}
     </newsletter.Form>
   </div>
 )
}

export default NewsletterFetcher
