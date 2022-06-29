import Breadcrumbs from '@App/components/blog/breadcrumbs';
import Layout from '@App/components/layoutTemplates/layout'
import { getBasicPageMetaTags } from '@App/utils/seo';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link } from '@remix-run/react';

export let meta: MetaFunction = (metaData): any => {

  /*
  metaData gets passed in from the root metadata function
   */
  const { data, location, parentsData } = metaData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  /*
  Build Metadata tags for the page
   */
  return getBasicPageMetaTags(metaData, {
    title: `Privacy Page`,
    desc: `Full transparency about the privacy practices implemented here at Every-Tuesday.com`,
    slug: `privacy-and-cookies`
  })
};

export let loader: LoaderFunction = async ({ request }) => {

  const page = {
    title: 'Privacy Page',
    slug: 'privacy-and-cookies',
    description: 'Full transparency about the privacy practices implemented here at Every-Tuesday.com',
    seo: {
      title: 'Privacy Page',
      opengraphModifiedTime: '',
      metaDesc: 'Full transparency about the privacy practices implemented here at Every-Tuesday.com'
    }
  }
  return json({ page }, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate" } })
};
const PrivacyPage = () => {
  const breadcrumbLinks = [
    {
      url: `/privacy-and-cookies`,
      text: 'Privacy Policy'
    }
  ]
  return (
    <Layout>
      <div className={'et-grid-basic'}>
        <div className='col-span-2 col-start-2 mt-2 mb-8 tablet:col-start-3 tablet:col-span-10 tablet:mt-5 tablet:mb-8'>
          <Breadcrumbs links={breadcrumbLinks} />
        </div>
        <div className='flex flex-col col-start-2 space-y-8 text-xl colo-span-2 tablet:col-span-10 tablet:col-start-3 linkChildren'>
          <h1 className='pb-12 text-5xl font-sentinel__SemiBoldItal text-sage-800'>Use of This Website and Privacy
          </h1>
          <p className='text-xl font-sentinel__SemiBoldItal'>
            Last Updated — Dec 7, 2021
          </p>
          <p className='text-xl'>
            <span className='font-bold'>Hey everyone, Teela here.</span> Just like you, I care about the use of my personal information online and I want you to have full transparency about the privacy practices implemented here at Every-Tuesday.com. Please read the entire policy to make sure you understand our practices fully.
          </p>

          <section className='flex flex-col space-y-4'>
            <h2 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              What personal data we collect and why we collect it
            </h2>
            <p>
              We collect person data to help better understand our readers and customers, provide better content for the future and help bring a more unique experience of interacting with our brand Every-Tuesday online. We do not share your data with anyone, not even advertisers, and we also do not sell your data to any third parties. The data collected is used to identify you such as your name, IP address, and email address. Collecting this data happens in several different ways:
            </p>
            <ol className='flex flex-col ml-8 space-y-4 list-decimal'>
              <li>Opt-In to Freebies: Your name and email address.</li>
              <li>Purchasing a product or course: Your name, email, billing information, and payment source.</li>
              <li>Comments: Name, email, and the comment.</li>
              <li>Join Every-Tuesday: Your name and email.</li>
              <li>Waitlists: Your email address.</li>
            </ol>
          </section>

          <section className='flex flex-col space-y-4'>
            <h3 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              We collect this data for the following:
            </h3>
            <ol className='flex flex-col ml-8 space-y-4 list-decimal'>
              <li>Opt-In to Freebies: To provide you with new free content in the future or paid content related to the freebie.</li>
              <li>Purchasing a product or course: To process a purchase you made with us and inform you of future products.</li>
              <li>Comments: To identify the person making the comment, and optionally show their gravatar image linked with their online profile.</li>
              <li>Join Every-Tuesday: To send you monthly recap emails, special offers, additional freebies and/or new paid content you may be interested in.</li>
              <li>Waitlists: To send you updates about a specific topic as well as special offers and notices about that topic.</li>
            </ol>
          </section>

          <section className='flex flex-col space-y-4'>
            <h4 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Why we collect this information:
            </h4>
            <p>
              We collect this information to learn from it. What products does our audience like, what types of topics do they learn the most from, what online courses they enjoy the most, what courses or products do they want us to make in the future, what area of the site could be designed better, what types of free resources would our audience enjoy the most, etc. The following outlines how we ask for your information:
            </p>
            <ol className='flex flex-col ml-8 space-y-4 list-decimal'>
              <li>Opt-In to Freebies: We will ask for your consent.</li>
              <li>Purchasing a product or course: We collect this information as part of a legal contractual transaction.</li>
              <li>Comments: We will ask for your consent.</li>
              <li>Join Every-Tuesday: We will ask for your consent.</li>
              <li>Waitlists: We will ask for your consent.</li>
            </ol>
          </section>

          <section className='flex flex-col space-y-4'>
            <h5 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Who has access to this data:
            </h5>
            <p>
              We work with a lot of different online businesses to bring you everything that Every-Tuesday has to offer, which means they help process your personal data. The following are those companies:
            </p>
            <ol className='flex flex-col ml-8 space-y-4 list-decimal'>
              <li>Opt-In to Freebies: Convertkit.com</li>
              <li>Purchasing a product: Gumroad.com – processing your payment.</li>
              <li>Purchasing a course: Teachable.com – processing your payment.</li>
              <li>Comments: WordPress</li>
              <li>Join Every-Tuesday: Convertkit.com</li>
              <li>Waitlists: Convertkit.com</li>
            </ol>
          </section>

          <section className='flex flex-col space-y-4'>
            <h6 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Cookies:
            </h6>
            <p>
              This site uses cookies and similar technologies to collect data on our users based on how people browse the site, content they are interested in, how a user uses the site in general from a mobile phone or tablet or other device, and areas of the world users are coming from.
            </p>
            <p>
              If you would like to revoke your consent to be tracked, then you need to clear your browser cookies for the every-tuesday.com domain. For information on how to do this, please follow the instructions on <a href="https://ico.org.uk/for-the-public/online/cookies/" target="_blank" rel="noopener noreferrer">this site</a>.
            </p>

          </section>

          <section className='flex flex-col space-y-4'>
            <p className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              YouTube API:
            </p>
            <p>
              The home page features a section that displays Teela’s top performing YouTube videos. This feature uses the YouTube API Client/ YouTube Services. Here is a link to <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube’s Privacy Policy</a>. We do not explicitly collect any data ourselves using this feature/service. We do not share any data YouTube collects with any one. The videos themselves have advertising on them which is all handled by YouTube itself. We do not use cookies or any browser storage technology to save user data when using this feature.
            </p>
          </section>

          <section className='flex flex-col space-y-4'>
            <p className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Embedded content from other websites
            </p>
            <p>
              Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
            </p>
            <p>
              These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracing your interaction with the embedded content if you have an account and are logged in to that website.
            </p>
          </section>

          <section className='flex flex-col space-y-4'>
            <p className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              How long we retain your data
            </p>
            <p>
              We keep your personal data for different periods of time depending on the reason it was gathered and if you are a current subscriber of <Link to='/' prefetch={'intent'}>Every-Tuesday.com</Link>
            </p>
            <ol className='flex flex-col ml-8 space-y-4 list-decimal'>
              <li>Opt-In to Freebies: Emails – Indefinitely unless you stop opening emails (after 6 months of unopened emails, your email is removed) or if you unsubscribe, we remove your email immediately.</li>
              <li>Purchasing a product: 4 years for tax audit purposes.</li>
              <li>Purchasing a course: 4 years for tax audit purposes.</li>
              <li>Comments: Indefinitely use as the comment stays visible for other users.
              </li>
              <li>Join Every-Tuesday: Indefinitely unless you stop opening emails (after 6 months of unopened emails, your email is removed) or if you unsubscribe, we remove your email immediately.</li>
              <li>Waitlists: Indefinitely unless you stop opening emails (after 6 months of unopened emails, your email is removed) or if you unsubscribe, we remove your email immediately</li>
            </ol>
          </section>

          <section className='flex flex-col space-y-4'>
            <p className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              What rights you have over your data
            </p>
            <p>
              If you have comments on our site, have purchased a course or product, signed up for one of our many freebies, newsletters, or waitlists you always have the right to withdraw your consent on any or all of those items. As with all emails, there is an unsubscribe link at the bottom that you can use to withdraw consent and stop our emails. Alternatively, you can <Link to='/contact' prefetch='intent'>contact us</Link> here. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
            </p>

          </section>

          <section className='flex flex-col space-y-4'>
            <p className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Where we send your data
            </p>
            <p>
              All your data is collected in the United States because that is where we are based as well as the companies we work with. All your data is collected in the United States because that is where we and the companies we work with are based. Visitor comments may be checked through an automated spam detection service.
            </p>
          </section>

          <section className='flex flex-col pb-12 space-y-4'>
            <p className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Privacy Concerns, Contacting Us, Complaints:
            </p>
            <p>
              You can <Link className='underline underline-offset-4' to='/contact' prefetch='intent'>contact us</Link> here with your request for any questions you may have regarding any of the new regulations on these policies and your personal data.
            </p>
            <p className='pt-12'>
              Teela and Spencer
            </p>
            <p>
              Every-Tuesday.com
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default PrivacyPage
