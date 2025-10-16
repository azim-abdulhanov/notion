import { AuthConfig } from 'convex/server'

export default {
  providers: [
    {
      domain: 'https://promoted-lab-38.clerk.accounts.dev',
      applicationID: 'convex'
    }
  ]
} satisfies AuthConfig
