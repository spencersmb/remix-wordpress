
export async function loader() {
  // let report = await getReport(params.id);
  // let pdf = await generateReportPDF(report);
  let xml = await generateRobotsTxt()
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}

async function generateRobotsTxt(){
  const sitemapUrl = `https://et-headless-wp.vercel.app/sitemap.xml`
  return `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}`;
}
