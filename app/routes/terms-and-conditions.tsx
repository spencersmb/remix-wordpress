import Breadcrumbs from "@App/components/blog/breadcrumbs"
import Layout from "@App/components/layoutTemplates/layout"
import { cacheControl } from "@App/lib/remix/loaders";
import { getStaticPageMeta } from "@App/utils/pageUtils";
import { getBasicPageMetaTags, mdxPageMetaV2 } from "@App/utils/seo";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react"

const page = getStaticPageMeta({
  title: 'Terms & Conditions',
  desc: 'Your access to and use of the products and courses within Every Tuesday is conditioned on your acceptance of and compliance with these Terms',
  slug: 'terms-and-conditions',
})
// export let meta = mdxPageMetaV2

export let loader: LoaderFunction = async ({ request }) => {
  return json({ page }, {
    headers: {
      // ...cacheControl
    }
  })
};

const TermsConditionsPage = () => {
  const breadcrumbLinks = [
    {
      url: `/terms-and-conditions`,
      text: 'Terms & Conditions'
    }
  ]
  return (
    <Layout>
      <div className={'et-grid-basic'}>
        <div className='col-span-2 col-start-2 mt-2 mb-8 tablet:col-start-3 tablet:col-span-10 tablet:mt-5 tablet:mb-8'>
          <Breadcrumbs links={breadcrumbLinks} />
        </div>
        <div className='flex flex-col col-start-2 space-y-8 text-xl colo-span-2 tablet:col-span-10 tablet:col-start-3 linkChildren'>
          <h1 className='pb-12 text-5xl font-sentinel__SemiBoldItal text-sage-800'>Terms & Conditions</h1>
          <p className='text-xl font-sentinel__SemiBoldItal'>
            Last Updated — April, 2020
          </p>

          <p className='text-xl'>
            Please read these Terms and Conditions carefully before using every-tuesday.com.
          </p>

          {/* Access and use */}
          <section className='flex flex-col space-y-4'>
            <h2 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Access and use
            </h2>
            <p>
              Your access to and use of the products and courses within Every Tuesday is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use every-tuesday.com, its products and/or courses. By accessing or using every-tuesday.com, you agree to be bound by these Terms. If you disagree with any part of the terms, then your access to products, courses or bonus content related to Every Tuesday courses may be limited and/or terminated.
            </p>
          </section>

          {/* YouTube API */}
          <section className='flex flex-col space-y-4'>
            <h3 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              YouTube API
            </h3>
            <p>
              On the homepage we use the youtube api to display Teela’s top 4 most popular videos to our users. By using this feature users are agreeing to be bound by the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube Terms of Service</a>. This sounds scary and you may be wondering what it is, but its basically the same as you going to visit YouTube.com so it shouldn’t be anything new.
            </p>
          </section>

          {/* Purchases */}
          <section className='flex flex-col space-y-4'>
            <h4 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Purchases
            </h4>
            <p>
              All Every Tuesday <Link to='/products' prefetch="intent">digital products</Link> are offered with two different kinds of licenses: standard or extended. Please view the complete guide to those licenses here: <Link to='/licenses' prefetch="intent">View Licenses</Link>. If you would like to upgrade your license from standard to extended, <Link to='/contact' prefetch="intent">get in touch</Link> for a pro-rated extended license listing. If you’re purchasing 10 or more extended licenses, a bulk discount may be made available. Please <Link to='/contact' prefetch="intent">get in touch</Link> for more info. If you need additional permissions that are not listed under the standard or extended license, please <Link to='/contact' prefetch="intent">contact us</Link>. Since there is no way to ‘return’ a digital product, we do not offer refunds. The items delivered are exactly as described – if you are unhappy for any reason, please <Link to='/contact' prefetch="intent">contact us</Link> and we will work hard to make all parties satisfied.
            </p>
            <p>
              All Every Tuesday courses come with a 30 day money back guarantee. The first day of the guarantee begins the day the course is purchased. If you would like to request a refund, you must <Link to='/contact' prefetch="intent">email Every Tuesday</Link> within the 30 day money back guarantee period. Please note: Exceeding two refund requests by the same student within a twelve month period will be considered an abuse of this policy and will therefore not be granted. Every Tuesday courses were created to help build skillsets and advance creative careers. If any course purchased is being used to create a competitive course of the same or similar topic, Every Tuesday reserves the right to terminate your enrollment and remove access to certain course bonuses (i.e. access to private facebook groups). This is a community over competition space and respect for our offerings and those of other creatives is paramount.
            </p>
          </section>

          {/* Subscriptions */}
          <section className='flex flex-col space-y-4'>
            <h4 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Subscriptions
            </h4>
            <p>
              Some Every Tuesday courses are offered with payment plans. When you enroll in a course and choose to pay via a payment plan, you are expected to complete all payments in a timely manner. Should you miss a scheduled payment, you will be alerted via email to update your payment info. If your info is not updated in a timely manner, Every Tuesday reserves the right to terminate your enrollment from the course as well as access to any bonus content (i.e. memberships in private facebook groups). If you would like to re-activate your enrollment after a previous termination, please <Link to='/contact' prefetch="intent">get in touch</Link>.
            </p>
          </section>

          {/* Content */}
          <section className='flex flex-col space-y-4'>
            <h4 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Content
            </h4>
            <p>
              The free design assets, tutorials and trainings made available to readers of Every Tuesday is exclusive content and Every Tuesday secures all rights to this content. You may link to Every Tuesday content or embed Every Tuesday YouTube videos onto your own site. You may not make any freebie a direct download on your site; you must link to the Every Tuesday site link for users to access this free content.
            </p>
          </section>

          {/* Links to other websites */}
          <section className='flex flex-col space-y-4'>
            <h4 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Links to other websites
            </h4>
            <p>
              In posts, Every Tuesday may link to third-party web sites or services that are not owned or controlled by Every Tuesday. Every Tuesday has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party websites or services. You further acknowledge and agree that Every Tuesday shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such websites or services.
            </p>
            <p>
              At times, Every Tuesday may use affiliate links within posts. This means Every Tuesday may make a commission at no cost to you, should you purchase a product/service using one of these links. Every Tuesday only promotes or recommends products/services that it has experience with, values and trusts. Purchasing from these affiliate links enables Every Tuesday to continue offering free content to its readers. Thank you in advance for your support!
            </p>
          </section>

          {/* Embedded content from other websites */}
          <section className='flex flex-col space-y-4'>
            <h4 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Embedded content from other websites
            </h4>
            <p>
              Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
            </p>
            <p>
              These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracing your interaction with the embedded content if you have an account and are logged in to that website.
            </p>
          </section>

          {/* Changes */}
          <section className='flex flex-col space-y-4'>
            <h4 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Changes
            </h4>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 7 days’ notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          {/* Contact Us */}
          <section className='flex flex-col pb-12 space-y-4'>
            <h4 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Contact Us
            </h4>
            <p>
              If you have any questions about these Terms, please <Link to='/contact' prefetch="intent">contact us</Link>.
            </p>
          </section>

        </div>
      </div>
    </Layout>
  )
}

export default TermsConditionsPage