// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "WhatsApp HTTP API",
  tagline: "REST API wrapper around Baileys for WhatsApp automation",
  favicon: "img/logo.png",
  url: "https://codeskytz-api-lajj0.sevalla.app",
  baseUrl: "/",
  organizationName: "sirtheprogrammer",
  projectName: "whatsapp-http-api-docs",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/sirtheprogrammer/whatsapp-http-api/tree/main/docs/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "WhatsApp HTTP API",
        logo: {
          alt: "WhatsApp HTTP API Logo",
          src: "img/logo.png",
        },
        items: [
          {
            to: "/docs/intro",
            label: "Docs",
            position: "left",
          },
          {
            href: "https://github.com/sirtheprogrammer/whatsapp-http-api",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting Started",
                to: "/docs/getting-started",
              },
              {
                label: "API Reference",
                to: "/docs/send-message",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/sirtheprogrammer/whatsapp-http-api",
              },
            ],
          },
        ],
        copyright: `MIT © ${new Date().getFullYear()} — SirTheProgrammer`,
      },
      prism: {
        theme: require("prism-react-renderer").themes.github,
        darkTheme: require("prism-react-renderer").themes.dracula,
      },
    }),
}

module.exports = config
