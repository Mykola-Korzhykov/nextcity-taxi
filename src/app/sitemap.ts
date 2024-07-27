import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
    const domain = process.env.DOMAIN
  return [
    {
      url: `${domain}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
        url: `${domain}/contacts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
        url: `${domain}/agreement`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}