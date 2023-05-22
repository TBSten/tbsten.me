/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://tbsten.me',
    generateRobotsTxt: true, // (optional)
    generateIndexSitemap: false,
    exclude: [
        "/admin",
        "/admin/*",
        "/secret",
        "/secret/*",
    ],
}
