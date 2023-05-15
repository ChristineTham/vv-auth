import logo from './assets/Visual Voyager logo.svg'

export const Settings = {
  site_name: 'Visual Voyager',
  logo: logo,
  currency_symbol: '$',
  currency_code: 'AUD'
}

export const NavItems = [
  {
    text: 'Home',
    url: '/'
  },
  {
    text: 'Events',
    url: '/events'
  },
  {
    text: 'About',
    url: '/about-us'
  },
  {
    text: 'Articles',
    url: '/blog'
  },
  {
    text: 'Contact',
    url: '/contact'
  }
]

export const FooterMenu = [
  {
    title: 'Helpful Links',
    links: [
      {
        text: 'About',
        url: '#'
      },
      {
        text: 'Info',
        url: '#'
      },
      {
        text: 'FAQ',
        url: '#'
      }
    ]
  },
  {
    title: 'Social Links',
    links: [
      {
        text: 'Facebook',
        icon: 'i-fa6-brands-facebook',
        url: 'https://www.facebook.com/visualvoyager'
      },
      {
        text: 'Instagram',
        icon: 'i-fa6-brands-instagram',
        url: 'https://www.instagram.com/v1sualv0yager/'
      },
      {
        text: 'Twitter',
        icon: 'i-fa6-brands-twitter',
        url: 'https://twitter.com/VisualVoyager'
      }
    ]
  }
]

export const Copyright = new Date().getFullYear() + ' Visual Voyager Pty Ltd'
