import clsx from "clsx"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import styles from "./index.module.css"

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Get Started →
          </Link>
        </div>
      </div>
    </header>
  )
}

function HomepageFeatures() {
  const features = [
    {
      title: "🚀 Easy to Use",
      description:
        "Simple REST API endpoints for WhatsApp automation. Send messages, manage sessions, and handle webhooks with ease.",
    },
    {
      title: "📱 Multi-Session Support",
      description: "Manage multiple WhatsApp sessions simultaneously. Perfect for businesses and automation workflows.",
    },
    {
      title: "🔔 Real-time Webhooks",
      description:
        "Receive instant notifications for incoming messages and events. Build responsive WhatsApp bots and integrations.",
    },
  ]

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className={clsx("col col--4")}>
              <div className="text--center padding-horiz--md">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`${siteConfig.title}`} description="REST API wrapper around Baileys for WhatsApp automation">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
