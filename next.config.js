const { i18n } = require('i18next');

module.exports = {
  ...i18n, // Include i18n config

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'eidcarosse.ch',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    const pages = [
      'about-us',
      'advance-search',
      'change-password',
      'chat',
      'edit-ad',
      'faq',
      'forgot-password',
      'how-to-sell-fast',
      'login',
      'my-ads',
      'my-favourites',
      'my-profile',
      'post-ad',
      'privacy-policy',
      'product-details',
      'search-filter',
      'signup',
      'terms-and-condition',
      'verify-account',
      'index',
      // Add other pages as needed
    ];

    return pages.map((page) => ({
      source: `/:lang/${page}`,
      destination: `/${page}`,
    }));
  },
};
