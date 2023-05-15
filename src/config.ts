import logo from './assets/Visual Voyager logo 600 x 160.png'

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
    title: 'More info',
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
    title: 'Find out more',
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
  }
]

export const Copyright = new Date().getFullYear() + ' Visual Voyager Pty Ltd'
