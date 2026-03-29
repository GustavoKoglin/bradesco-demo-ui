import { createElement, useEffect, useMemo, useState } from 'react'
import {
  Accessibility,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  Banknote,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  CheckCircle,
  CreditCard,
  FileText,
  Fingerprint,
  HandCoins,
  House,
  Landmark,
  Lock,
  Menu,
  MessageCircle,
  Rocket,
  Search,
  Shield,
  ShieldCheck,
  Smartphone,
  Star,
  User,
  Users,
  Wallet,
  X,
  Zap,
} from 'lucide-react'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
import { getHomeContent } from './services/contentService'
import bradescoLogoOficial from './assets/bradesco-logo-oficial-2018-2.png'
import './App.css'

const actionIcons = {
  debts: HandCoins,
  card: CreditCard,
  consortium: Building2,
  dental: ShieldCheck,
  home: House,
  invest: Landmark,
  options: BriefcaseBusiness,
}

const serviceIcons = {
  attendance: MessageCircle,
  invoice: Wallet,
  payments: Banknote,
  unlock: CreditCard,
  renegotiate: HandCoins,
  security: Lock,
}

const segmentIcons = {
  pf: User,
  pj: Users,
}

const facilityFeatureIcons = {
  salaryPortability: Wallet,
  loans: HandCoins,
}

const socialBrandIcons = {
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  x: FaXTwitter,
  youtube: FaYoutube,
  instagram: FaInstagram,
  tiktok: FaTiktok,
}

function resolveSocialIcon(item) {
  const rawKey = `${item.icon ?? item.label ?? ''}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')

  const href = (item.href ?? '').toLowerCase()

  if (rawKey.includes('linkedin') || href.includes('linkedin.com')) return FaLinkedinIn
  if (rawKey.includes('facebook') || href.includes('facebook.com')) return FaFacebookF
  if (rawKey === 'x' || rawKey.includes('xtwitter') || href.includes('x.com')) return FaXTwitter
  if (rawKey.includes('youtube') || href.includes('youtube.com')) return FaYoutube
  if (rawKey.includes('instagram') || href.includes('instagram.com')) return FaInstagram
  if (rawKey.includes('tiktok') || href.includes('tiktok.com')) return FaTiktok

  return socialBrandIcons[rawKey] ?? FaLinkedinIn
}

function App() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [accessibilityOpen, setAccessibilityOpen] = useState(false)
  const [fontScale, setFontScale] = useState(1)
  const [highContrast, setHighContrast] = useState(false)
  const [openTopMenu, setOpenTopMenu] = useState(null)
  const [heroIndex, setHeroIndex] = useState(0)
  const [facilityIndex, setFacilityIndex] = useState(0)
  const [agency, setAgency] = useState('')
  const [account, setAccount] = useState('')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const controller = new AbortController()

    async function loadContent() {
      try {
        setLoading(true)
        const result = await getHomeContent(controller.signal)
        setContent(result)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setContent(null)
        }
      } finally {
        setLoading(false)
      }
    }

    loadContent()

    return () => controller.abort()
  }, [])

  const heroSlides = content?.heroSlides ?? []
  const facilitySlides = content?.facilities?.slides ?? []

  useEffect(() => {
    if (prefersReducedMotion || heroSlides.length <= 1) {
      return undefined
    }

    const timer = setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length)
    }, 6500)

    return () => clearInterval(timer)
  }, [heroSlides.length, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || facilitySlides.length <= 1) {
      return undefined
    }

    const timer = setInterval(() => {
      setFacilityIndex((current) => (current + 1) % facilitySlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [facilitySlides.length, prefersReducedMotion])

  useEffect(() => {
    if (!drawerOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const currentHero = heroSlides[heroIndex]
  const currentFacility = facilitySlides[facilityIndex]

  const quickActions = useMemo(() => content?.quickActions ?? [], [content])
  const topMenus = useMemo(() => content?.topMenus ?? [], [content])
  const serviceCards = useMemo(() => content?.services?.cards ?? [], [content])
  const segments = useMemo(() => content?.segments?.cards ?? [], [content])
  const facilityFeaturedCards = useMemo(
    () => content?.facilities?.featuredCards ?? [],
    [content],
  )

  const nextHero = () => {
    if (heroSlides.length > 1) {
      setHeroIndex((current) => (current + 1) % heroSlides.length)
    }
  }

  const prevHero = () => {
    if (heroSlides.length > 1) {
      setHeroIndex((current) =>
        current === 0 ? heroSlides.length - 1 : current - 1,
      )
    }
  }

  const nextFacility = () => {
    if (facilitySlides.length > 1) {
      setFacilityIndex((current) => (current + 1) % facilitySlides.length)
    }
  }

  const prevFacility = () => {
    if (facilitySlides.length > 1) {
      setFacilityIndex((current) =>
        current === 0 ? facilitySlides.length - 1 : current - 1,
      )
    }
  }

  const canAccessAccount = agency.length >= 4 && account.length >= 6

  const handleDigitsOnly = (setter, limit) => (event) => {
    const onlyDigits = event.target.value.replace(/\D/g, '').slice(0, limit)
    setter(onlyDigits)
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()
  }

  const handleTopMenuToggle = (menuKey) => {
    setOpenTopMenu((current) => (current === menuKey ? null : menuKey))
  }

  const increaseFont = () => {
    setFontScale((current) => Math.min(1.2, Number((current + 0.05).toFixed(2))))
  }

  const decreaseFont = () => {
    setFontScale((current) => Math.max(0.9, Number((current - 0.05).toFixed(2))))
  }

  const resetAccessibility = () => {
    setFontScale(1)
    setHighContrast(false)
  }

  if (loading) {
    return (
      <div className="loading-shell" role="status" aria-live="polite">
        <p>Carregando experiencia digital...</p>
      </div>
    )
  }

  if (!content || !currentHero || !currentFacility) {
    return (
      <div className="loading-shell" role="alert">
        <p>Nao foi possivel carregar o conteudo no momento.</p>
      </div>
    )
  }

  return (
    <div
      className={`page ${highContrast ? 'a11y-high-contrast' : ''}`}
      style={{ fontSize: `${fontScale * 100}%` }}
    >
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteudo principal
      </a>

      <header>
        <div className="utility-bar">
          <form className="utility-left" onSubmit={handleLoginSubmit}>
            <button type="button" className="utility-cta">
              {content.topBar.cta}
            </button>
            <span className="divider" aria-hidden="true" />
            <label htmlFor="agency" className="utility-label">
              {content.topBar.agencyLabel}
            </label>
            <input
              id="agency"
              className="access-input"
              inputMode="numeric"
              autoComplete="off"
              placeholder="0000"
              aria-label="Agencia"
              value={agency}
              onChange={handleDigitsOnly(setAgency, 4)}
            />
            <label htmlFor="account" className="utility-label">
              {content.topBar.accountLabel}
            </label>
            <input
              id="account"
              className="access-input"
              inputMode="numeric"
              autoComplete="off"
              placeholder="000000"
              aria-label="Conta"
              value={account}
              onChange={handleDigitsOnly(setAccount, 10)}
            />
            <button type="submit" className="ok-button" disabled={!canAccessAccount}>
              OK
            </button>
            <label className="remember-toggle" htmlFor="remember-session">
              <input id="remember-session" type="checkbox" defaultChecked />
              <span>{content.topBar.remember}</span>
            </label>
            <button type="button" className="utility-help-link">
              {content.topBar.help}
            </button>
          </form>
          <button
            className="accessibility-link"
            type="button"
            aria-expanded={accessibilityOpen}
            aria-controls="painel-acessibilidade"
            onClick={() => setAccessibilityOpen((current) => !current)}
          >
            <Accessibility size={15} aria-hidden="true" />
            {content.topBar.accessibility}
          </button>
        </div>

        <div
          id="painel-acessibilidade"
          className={`accessibility-panel ${accessibilityOpen ? 'is-open' : ''}`}
          hidden={!accessibilityOpen}
          role="region"
          aria-label="Painel de acessibilidade"
        >
          <p className="accessibility-panel-title">Ajustes de acessibilidade</p>
          <div className="accessibility-controls">
            <button type="button" className="accessibility-control" onClick={decreaseFont}>
              A-
            </button>
            <span className="accessibility-status">Fonte: {Math.round(fontScale * 100)}%</span>
            <button type="button" className="accessibility-control" onClick={increaseFont}>
              A+
            </button>
            <button
              type="button"
              className={`accessibility-control ${highContrast ? 'is-active' : ''}`}
              onClick={() => setHighContrast((current) => !current)}
              aria-pressed={highContrast}
            >
              Alto contraste
            </button>
            <button type="button" className="accessibility-control" onClick={resetAccessibility}>
              Resetar
            </button>
          </div>
        </div>

        <nav className="main-nav" aria-label="Navegacao principal">
          <div className="logo-wrap">
            <img
              src={bradescoLogoOficial}
              alt={content.brand.logoAlt}
              className="brand-logo"
              loading="eager"
              width="170"
              height="36"
            />
          </div>

          <div className="nav-links desktop-nav">
            {content.nav.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="header-top-menus desktop-nav" aria-label="Menus de perfis e empresas">
            {topMenus.map((menu) => (
              <div
                className={`top-menu ${openTopMenu === menu.key ? 'is-open' : ''}`}
                key={menu.key}
              >
                <button
                  type="button"
                  className="top-menu-trigger"
                  aria-expanded={openTopMenu === menu.key}
                  onClick={() => handleTopMenuToggle(menu.key)}
                >
                  <span>{menu.overline}</span>
                  <strong>{menu.title}</strong>
                </button>
                <ul className="top-menu-list" hidden={openTopMenu !== menu.key}>
                  {menu.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} onClick={() => setOpenTopMenu(null)}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="nav-actions">
            <button type="button" className="search-btn" aria-label="Buscar">
              <Search size={18} aria-hidden="true" />
              <span>Busca</span>
            </button>
            <button
              type="button"
              className="menu-btn"
              aria-label="Abrir menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {drawerOpen ? (
          <>
            <Motion.button
              type="button"
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              onClick={() => setDrawerOpen(false)}
              aria-label="Fechar menu"
            />
            <Motion.aside
              id="mobile-menu"
              className="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: 'easeOut' }}
            >
              <div className="drawer-head">
                <strong>Menu</strong>
                <button
                  type="button"
                  className="menu-close-btn"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Fechar menu"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
              <div className="drawer-links">
                {content.nav.map((item) => (
                  <a key={item.id} href={`#${item.id}`} onClick={() => setDrawerOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </div>
            </Motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <main id="conteudo-principal">
        <section className="hero-section" aria-label="Destaques">
          <button
            type="button"
            className="carousel-control"
            onClick={prevHero}
            aria-label="Slide anterior"
            disabled={heroSlides.length <= 1}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>

          <Motion.article
            className="hero-slide"
            key={currentHero.title}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
          >
            <div className="hero-left">
              <p className="kicker">{currentHero.kicker}</p>
              <h1>{currentHero.title}</h1>
              <p>{currentHero.description}</p>
              <button type="button" className="primary-btn">
                {currentHero.cta}
              </button>
            </div>
            <div className="hero-right">
              <p className="highlight">{currentHero.highlight}</p>
              {currentHero.benefits.map((benefit) => (
                <p key={benefit}>+ {benefit}</p>
              ))}
            </div>
          </Motion.article>

          <button
            type="button"
            className="carousel-control"
            onClick={nextHero}
            aria-label="Proximo slide"
            disabled={heroSlides.length <= 1}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>

          <div className="dots" role="tablist" aria-label="Trocar slide principal">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={`dot ${heroIndex === index ? 'active' : ''}`}
                onClick={() => setHeroIndex(index)}
                aria-label={`Ir para slide ${index + 1}`}
                aria-selected={heroIndex === index}
                role="tab"
              />
            ))}
          </div>
        </section>

        <section className="quick-actions" aria-label="Acesso rapido">
          {quickActions.map((action) => {
            const Icon = actionIcons[action.key] ?? BriefcaseBusiness

            return (
              <button key={action.key} type="button" className="quick-card">
                {createElement(Icon, { size: 30, strokeWidth: 1.8, 'aria-hidden': true })}
                <span>{action.label}</span>
              </button>
            )
          })}
        </section>

        <section className="services" id="produtos" aria-labelledby="titulo-servicos">
          <div className="services-intro">
            <h2 id="titulo-servicos">{content.services.title}</h2>
            <p>{content.services.description}</p>
          </div>
          <div className="services-grid" id="atendimento">
            {serviceCards.map((card) => {
              const Icon = serviceIcons[card.key] ?? Smartphone

              return (
                <article key={card.key} className="service-card">
                  {createElement(Icon, { size: 28, strokeWidth: 1.8, 'aria-hidden': true })}
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="segments-section" id="contas" aria-labelledby="titulo-contas">
          <div className="segments-head">
            <h2 id="titulo-contas">{content.segments.title}</h2>
            <p>{content.segments.description}</p>
          </div>
          <div className="segments-grid">
            {segments.map((segment) => {
              const Icon = segmentIcons[segment.key] ?? User

              return (
                <article key={segment.key} className="segment-card">
                  <span className="segment-badge">{segment.badge}</span>
                  {createElement(Icon, { size: 30, strokeWidth: 1.8, 'aria-hidden': true })}
                  <h3>{segment.title}</h3>
                  <p>{segment.text}</p>
                  <ul>
                    {segment.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        <section className="facility-section" id="facilidades" aria-labelledby="titulo-facilidades">
          <div className="facility-content">
            <h2 id="titulo-facilidades">{content.facilities.title}</h2>
            <p>{content.facilities.description}</p>

            <div className="facility-layout">
              <div className="facility-carousel">
                <button
                  type="button"
                  className="facility-control"
                  onClick={prevFacility}
                  aria-label="Facilidade anterior"
                  disabled={facilitySlides.length <= 1}
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>

                <AnimatePresence mode="wait">
                  <Motion.article
                    key={currentFacility.title}
                    className="facility-card"
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                  >
                    <Smartphone size={36} aria-hidden="true" />
                    <h3>{currentFacility.title}</h3>
                    <p>{currentFacility.subtitle}</p>
                    <small>{currentFacility.text}</small>
                  </Motion.article>
                </AnimatePresence>

                <button
                  type="button"
                  className="facility-control"
                  onClick={nextFacility}
                  aria-label="Proxima facilidade"
                  disabled={facilitySlides.length <= 1}
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>

              <aside className="facility-feature-grid" aria-label="Solucoes em destaque">
                {facilityFeaturedCards.map((item) => {
                  const Icon = facilityFeatureIcons[item.key] ?? Smartphone

                  return (
                    <article key={item.key} className="facility-feature-card">
                      {createElement(Icon, {
                        size: 24,
                        strokeWidth: 1.8,
                        'aria-hidden': true,
                      })}
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <button type="button">{item.cta}</button>
                    </article>
                  )
                })}
              </aside>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="stats-section" id="stats">
          <div className="stats-container">
            {content.stats.items.map((stat) => (
              <Motion.article
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <strong className="stat-value">{stat.value}</strong>
                <small className="stat-unit">{stat.unit}</small>
                <p>{stat.label}</p>
              </Motion.article>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="testimonials-section" id="testimonials">
          <div className="testimonials-wrapper">
            <h2>{content.testimonials.title}</h2>
            <p className="testimonials-desc">{content.testimonials.description}</p>
            <div className="testimonials-grid">
              {content.testimonials.items.map((item) => (
                <Motion.article
                  key={item.name}
                  className="testimonial-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="testimonial-header">
                    <span className="testimonial-avatar">{item.avatar}</span>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.role}</small>
                    </div>
                  </div>
                  <p>{item.text}</p>
                  <div className="testimonial-rating">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </Motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="benefits-section" id="benefits">
          <div className="benefits-wrapper">
            <h2>{content.benefits.title}</h2>
            <p className="benefits-desc">{content.benefits.description}</p>
            <div className="benefits-grid">
              {content.benefits.items.map((benefit) => {
                const BenefitIcon = {
                  Zap,
                  Rocket,
                  Shield,
                  Smartphone,
                }[benefit.icon] || Zap
                return (
                  <Motion.article
                    key={benefit.key}
                    className="benefit-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <BenefitIcon size={40} aria-hidden="true" />
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </Motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* MAIN CTA SECTION */}
        <section className="main-cta-section">
          <Motion.div
            className="main-cta-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>{content.maincta.title}</h2>
            <p>{content.maincta.description}</p>
            <button type="button" className="main-cta-btn">
              {content.maincta.button}
            </button>
          </Motion.div>
        </section>

        {/* COMPARISON SECTION */}
        <section className="comparison-section" id="comparison">
          <div className="comparison-wrapper">
            <h2>{content.comparison.title}</h2>
            <p className="comparison-desc">{content.comparison.description}</p>
            <div className="comparison-table">
              <div className="comparison-header">
                <div className="comparison-profile-title">Perfil</div>
                {content.comparison.products.map((product) => (
                  <div key={product.name} className="comparison-product-head">
                    <strong>{product.name}</strong>
                    {product.detail ? <small>{product.detail}</small> : null}
                  </div>
                ))}
              </div>
              {content.comparison.profiles.map((profile) => (
                <div key={profile.name} className="comparison-row">
                  <div className="comparison-profile">
                    <strong>{profile.name}</strong>
                    {profile.summary ? <small>{profile.summary}</small> : null}
                  </div>
                  {profile.features.map((has, idx) => (
                    <div key={idx} className="comparison-cell">
                      {has ? <CheckCircle size={20} /> : '—'}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="comparison-extra">
              <ul className="comparison-notes">
                {content.comparison.notes?.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              {content.comparison.cta?.label ? (
                <a href={content.comparison.cta.href ?? '#atendimento'} className="comparison-cta">
                  {content.comparison.cta.label}
                </a>
              ) : null}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="faq-section" id="faq">
          <div className="faq-wrapper">
            <h2>{content.faq.title}</h2>
            <p className="faq-desc">{content.faq.description}</p>
            <div className="faq-list">
              {content.faq.items.map((item, idx) => (
                <FaqItem key={idx} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* SECURITY SECTION */}
        <section className="security-section" id="security">
          <div className="security-wrapper">
            <h2>{content.security.title}</h2>
            <p className="security-desc">{content.security.description}</p>
            <div className="security-grid">
              {content.security.features.map((feature) => {
                const SecurityIcon = {
                  Fingerprint,
                  Lock,
                  AlertCircle,
                  CheckCircle,
                  FileText,
                  Award,
                }[feature.icon] || Shield
                return (
                  <Motion.article
                    key={feature.title}
                    className="security-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SecurityIcon size={32} aria-hidden="true" />
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </Motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* BLOG SECTION */}
        <section className="blog-section" id="blog">
          <div className="blog-wrapper">
            <h2>{content.blog.title}</h2>
            <p className="blog-desc">{content.blog.description}</p>
            <div className="blog-grid">
              {content.blog.posts.map((post) => (
                <Motion.article
                  key={post.title}
                  className="blog-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="blog-image">{post.image}</div>
                  <div className="blog-content">
                    <h3>{post.title}</h3>
                    <p className="blog-meta">
                      <span>{post.category}</span>
                      <span>{post.date}</span>
                    </p>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <button type="button" className="blog-link">
                      Ler mais →
                    </button>
                  </div>
                </Motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERS SECTION */}
        <section className="partners-section" id="partners">
          <div className="partners-wrapper">
            <h2>{content.partners.title}</h2>
            <p className="partners-desc">{content.partners.description}</p>
            <div className="partners-grid">
              {content.partners.logos.map((logo) => {
                const [icon = '•', ...nameParts] = logo.split(' ')
                const name = nameParts.join(' ')

                return (
                  <Motion.article
                    key={logo}
                  className="partner-logo"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="partner-emoji" aria-hidden="true">
                    {icon}
                  </span>
                  <h3 className="partner-name">{name}</h3>
                </Motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="timeline-section" id="timeline">
          <div className="timeline-wrapper">
            <h2>{content.timeline.title}</h2>
            <p className="timeline-desc">{content.timeline.description}</p>
            <div className="timeline">
              {content.timeline.events.map((event, idx) => (
                <Motion.article
                  key={event.year}
                  className="timeline-event"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-content">
                    <span className="timeline-year">{event.year}</span>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                </Motion.article>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer id="seguranca" className="footer-shell">
        <div className="footer-hero">
          <div className="footer-topline">
            <div className="footer-social" aria-label="Redes sociais">
              <strong>Acompanhe:</strong>
              <ul>
                {content.footerSocial.map((item) => {
                  const Icon = resolveSocialIcon(item)

                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        aria-label={item.label}
                        title={item.label}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <Icon aria-hidden="true" className="footer-social-icon" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="footer-legal-center">
              <p>{content.legal.line1}</p>
              <p>{content.legal.line2}</p>
            </div>

            <div className="footer-brand" aria-label="Bradesco">
              <img
                src={bradescoLogoOficial}
                alt="Bradesco"
                width="150"
                height="32"
              />
            </div>
          </div>

          <div className="footer-divider" aria-hidden="true" />

          <nav className="footer-inline-nav" aria-label="Links institucionais">
            {content.footerInlineLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>

      <Motion.button
        type="button"
        className="bia-float"
        aria-label="Abrir atendimento no WhatsApp"
        animate={
          prefersReducedMotion
            ? { y: 0, scale: 1 }
            : {
                y: [0, -5, -2, 0],
                x: [0, 1, -1, 0],
                scale: [1, 1.018, 1.01, 1],
                rotate: [0, -0.6, 0.4, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 3.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        whileHover={
          prefersReducedMotion
            ? {}
            : {
                scale: 1.08,
                y: -2,
                rotate: -1.2,
                transition: {
                  type: 'spring',
                  stiffness: 340,
                  damping: 18,
                },
              }
        }
        whileTap={{ scale: 0.97 }}
      >
        <span className="bia-orb" aria-hidden="true" />
        <span className="bia-spark" aria-hidden="true" />
        <span className="bia-ping" aria-hidden="true" />
        <span className="bia-label">BIA no</span>
        <span className="bia-label">WhatsApp</span>
      </Motion.button>
    </div>
  )
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="faq-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.replace(/\s+/g, '-')}`}
      >
        <span>{question}</span>
        <span className="faq-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            id={`faq-answer-${question.replace(/\s+/g, '-')}`}
            className="faq-answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          >
            <p>{answer}</p>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
