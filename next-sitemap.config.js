/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://tbsten.me.com',
    generateRobotsTxt: true, // (optional)
    // ...other options
    exclude: [
        "/admin",
        "/admin/*",
        "/secret",
        "/secret/*",
    ],
}
