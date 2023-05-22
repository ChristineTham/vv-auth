import logo from './assets/Visual Voyager logo.svg'

export const Settings = {
  site_name: 'Visual Voyager',
  description: 'world travel and photography',
  twitter: '@VisualVoyager',
  email: 'info@visualvoyager.net',
  location: 'Sydney, Australia',
  logo: logo,
  locale: 'en-AU',
  timezone: 'Australia/Sydney',
  currency_symbol: '$',
  currency_code: 'AUD',
  buildTime: new Date()
}

export const NavItems = [
  {
    text: 'Home',
    url: '/'
  },
  {
    text: 'About',
    url: '/about-us'
  },
  {
    text: 'Events',
    url: '/events'
  },
  {
    text: 'Articles',
    url: '/category/article'
  },
  {
    text: 'Article Series',
    url: '/category/series'
  },
  {
    text: 'Photos of the Day',
    url: '/category/photo-of-the-day'
  },
  {
    text: 'Reviews',
    url: '/category/review'
  },
  {
    text: 'Tags',
    url: '/tags'
  },
  {
    text: 'Contact',
    url: '/contact'
  }
]

export const FooterMenu: {
  title: string
  links: {
    text: string
    url: string
    icon?: string
  }[]
}[] = [
  {
    title: 'Helpful Links',
    links: [
      {
        text: 'About Us',
        icon: 'i-fa6-solid-passport',
        url: '/about-us'
      },
      {
        text: 'Privacy',
        icon: 'i-fa6-solid-user-lock',
        url: '/privacy'
      },
      {
        text: 'Contact Us',
        icon: 'i-fa6-solid-bullhorn',
        url: '/contact'
      }
    ]
  }
]

export const Copyright = new Date().getFullYear() + ' Visual Voyager Pty Ltd'
