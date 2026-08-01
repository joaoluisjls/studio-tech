import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Gauge,
  Smartphone,
  Search,
  Zap,
  ShieldCheck,
  Layers,
  Sparkles,
  Headphones,
  Globe,
  ShoppingBag,
  Rocket,
  Wrench,
  Server,
  Link2,
  Bot,
  Target,
} from "lucide-react";
import {
  CustomCursor,
  LoadingScreen,
  ParticleField,
  useSmoothScroll,
} from "@/components/site/Atmosphere";
import { MagneticButton, Reveal, SectionLabel } from "@/components/site/atoms";
import { ConceptCard, concepts } from "@/components/site/Portfolio";
import { TouchGlow, HapticFeedback, MotionParallax } from "@/components/site/MobileEffects";
import logoImg from "@/assets/logo-studiotech.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudioTech | Sites Premium de Alta Conversão" },
      {
        name: "description",
        content:
          "A StudioTech cria experiências digitais premium que geram autoridade, atraem clientes e aumentam vendas. Sites rápidos, responsivos e otimizados para conversão.",
      },
      { property: "og:title", content: "StudioTech | Sites Premium de Alta Conversão" },
      {
        property: "og:description",
        content:
          "Não vendemos sites. Construímos experiências digitais que transformam visitantes em clientes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const nav = [
  { label: "Sobre", href: "#sobre" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "FAQ", href: "#faq" },
];

const servicos = [
  { icon: Globe, title: "Sites Institucionais", desc: "Presença digital que constrói autoridade desde o primeiro segundo." },
  { icon: Target, title: "Landing Pages", desc: "Páginas cirúrgicas, desenhadas para uma única ação: converter." },
  { icon: ShoppingBag, title: "Lojas Virtuais", desc: "E-commerce rápido, com checkout curto e vitrine irresistível." },
  { icon: Search, title: "SEO", desc: "Estrutura técnica e conteúdo para você ser encontrado no Google." },
  { icon: Rocket, title: "Otimização", desc: "Performance, Core Web Vitals e taxa de conversão em outro patamar." },
  { icon: Wrench, title: "Manutenção", desc: "Atualizações, correções e evolução contínua do seu site." },
  { icon: Server, title: "Hospedagem", desc: "Infraestrutura global, SSL e uptime monitorado 24/7." },
  { icon: Globe, title: "Domínio", desc: "Registro, configuração de DNS e e-mail profissional." },
  { icon: Link2, title: "Integrações", desc: "CRM, WhatsApp, pagamentos, analytics e o que mais precisar." },
  { icon: Bot, title: "Automação", desc: "Fluxos automáticos que atendem e qualificam enquanto você dorme." },
];

const diferenciais = [
  { icon: Sparkles, title: "Design Premium", desc: "Interfaces com padrão internacional, feitas para impressionar." },
  { icon: Target, title: "Alta Conversão", desc: "Cada seção é uma decisão estratégica de CRO." },
  { icon: Search, title: "SEO", desc: "Semântica, dados estruturados e velocidade a favor do ranking." },
  { icon: Smartphone, title: "Responsividade", desc: "Perfeito de 320px a monitores ultrawide 4K." },
  { icon: Zap, title: "Velocidade", desc: "Carregamento instantâneo, imagens otimizadas e lazy loading." },
  { icon: ShieldCheck, title: "Segurança", desc: "HTTPS, backups e boas práticas em toda a stack." },
  { icon: Layers, title: "Integrações", desc: "Seu site conversando com todas as suas ferramentas." },
  { icon: Headphones, title: "Suporte", desc: "Time próximo, respostas rápidas e acompanhamento real." },
];

const processo = [
  { title: "Planejamento", desc: "Entendemos o negócio, o público e a meta comercial do projeto." },
  { title: "Design", desc: "Criamos a identidade da interface e a jornada de conversão." },
  { title: "Desenvolvimento", desc: "Código limpo, semântico e otimizado desde a primeira linha." },
  { title: "Testes", desc: "Performance, responsividade, SEO e usabilidade validados." },
  { title: "Entrega", desc: "Publicação, domínio, analytics e treinamento de uso." },
  { title: "Suporte", desc: "Evolução contínua para o site nunca ficar parado no tempo." },
];

const faq = [
  {
    q: "Quanto tempo leva para o meu site ficar pronto?",
    a: "Landing pages ficam prontas em poucos dias e sites institucionais completos costumam levar de 2 a 4 semanas, dependendo do volume de conteúdo e integrações.",
  },
  {
    q: "O site funciona bem no celular?",
    a: "Sim. Desenvolvemos mobile-first e testamos de telas de 320px até monitores 4K e ultrawide, garantindo que nenhum elemento quebre ou saia da tela.",
  },
  {
    q: "Vocês cuidam do domínio e da hospedagem?",
    a: "Cuidamos de tudo: registro de domínio, DNS, certificado SSL, hospedagem global e monitoramento. Você recebe o projeto no ar e funcionando.",
  },
  {
    q: "Meu site vai aparecer no Google?",
    a: "Entregamos a base técnica completa de SEO — estrutura semântica, metadados, dados estruturados, sitemap e performance — que é o que sustenta o crescimento orgânico.",
  },
  {
    q: "Consigo atualizar o conteúdo sozinho?",
    a: "Sim. Entregamos painéis simples e treinamento gravado. E, se preferir, o plano de manutenção deixa as atualizações por nossa conta.",
  },
  {
    q: "Como funciona o investimento?",
    a: "Cada projeto recebe um escopo próprio. Após uma conversa rápida sobre o seu negócio, enviamos uma proposta com valor fechado, prazos e entregáveis.",
  },
];

function Home() {
  useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <LoadingScreen />
      <CustomCursor />
      <TouchGlow />
      <HapticFeedback />
      <MotionParallax />

      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <nav
          className={`mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full px-4 py-3 transition-all duration-500 sm:px-6 ${
            scrolled ? "glass mx-3 shadow-[var(--glow-sm)] sm:mx-6" : "mx-3 sm:mx-6"
          }`}
        >
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <img src={logoImg} alt="StudioTech Logo" className="size-9 shrink-0 rounded-xl object-cover shadow-[var(--glow-sm)]" />
            <span className="truncate font-display text-lg font-extrabold tracking-tight">
              Studio<span className="text-gradient">Tech</span>
            </span>
          </a>
          <div className="flex items-center gap-1">
            <ul className="hidden items-center gap-1 lg:flex">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <MagneticButton href="#contato" className="ml-1 shrink-0" size="md">
              Solicitar Projeto
            </MagneticButton>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="top"
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-28 pb-16"
      >
        <div className="absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-[-18%] left-1/2 size-[70vw] max-w-[900px] -translate-x-1/2 animate-glow-pulse rounded-full bg-primary/25 blur-[120px]" />
          <div className="absolute bottom-[-25%] left-[8%] size-[45vw] max-w-[620px] animate-float rounded-full bg-[color:var(--royal)]/25 blur-[130px]" />
        </div>
        <ParticleField />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent"
          aria-hidden="true"
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-5xl px-5 text-center sm:px-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex w-fit items-center gap-3"
          >
            <img src={logoImg} alt="StudioTech Logo" className="size-12 rounded-2xl object-cover shadow-[var(--glow-md)] sm:size-14" />
            <span className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Studio<span className="text-gradient">Tech</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-[2rem] leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Seu sucesso de clientes começa aqui!
            <span className="mt-3 block text-gradient text-[1.35rem] leading-[1.25] sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
              Criamos experiências digitais que geram autoridade, atraem clientes e aumentam
              vendas.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-lg"
          >
            Seu site deve trabalhar por você 24 horas por dia. Criamos experiências digitais que
            transformam visitantes em clientes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.05, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <MagneticButton href="#portfolio" size="lg" className="w-full sm:w-auto">
              Ver Portfólio <ArrowRight className="size-4" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href="#contato" variant="ghost" size="lg" className="w-full sm:w-auto">
              Solicitar Projeto
            </MagneticButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4"
          >
            {[
              { icon: Gauge, label: "+98 Performance" },
              { icon: Smartphone, label: "100% Responsivo" },
              { icon: Search, label: "SEO Avançado" },
              { icon: Zap, label: "Carregamento Ultrarrápido" },
            ].map((b) => (
              <li
                key={b.label}
                className="glass flex min-w-0 items-center gap-2 rounded-2xl px-3 py-3 text-left sm:px-4"
              >
                <b.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0 text-[11px] leading-tight font-semibold sm:text-xs">
                  {b.label}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="relative overflow-hidden border-y border-border/60 py-4">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex gap-10">
              {[
                "Design Premium",
                "Alta Conversão",
                "SEO Técnico",
                "Motion Design",
                "Performance 95+",
                "Mobile First",
                "Automação",
              ].map((t) => (
                <span
                  key={t + dup}
                  className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SOBRE */}
      <section id="sobre" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="min-w-0">
            <Reveal>
              <SectionLabel>Sobre a StudioTech</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-3xl font-extrabold sm:text-5xl">
                Muito além de <span className="text-gradient">um site.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-lg">
                A StudioTech desenvolve soluções digitais voltadas para crescimento. Não entregamos
                páginas bonitas e paradas: entregamos ativos comerciais que trabalham pelo seu
                negócio todos os dias, gerando autoridade, atraindo o cliente certo e encurtando o
                caminho até a venda.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Unimos estratégia de conversão, design de padrão internacional e engenharia de
                performance. Cada pixel tem função, cada segundo de carregamento é disputado e cada
                seção existe para levar o visitante um passo adiante.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-3 gap-3">
                {[
                  { n: "+150", l: "projetos digitais" },
                  { n: "98+", l: "score médio" },
                  { n: "24/7", l: "seu site vendendo" },
                ].map((s) => (
                  <div key={s.l} className="glass min-w-0 rounded-2xl p-4 text-center">
                    <div className="font-display text-xl font-extrabold text-gradient sm:text-3xl">
                      {s.n}
                    </div>
                    <div className="mt-1 text-[10px] leading-tight text-muted-foreground sm:text-xs">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="min-w-0">
            <div className="glass glow-border relative overflow-hidden rounded-3xl p-6 sm:p-10">
              <div
                className="absolute -top-24 -right-16 size-64 animate-glow-pulse rounded-full bg-primary/25 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative space-y-5">
                {[
                  { t: "Estratégia antes do design", d: "Estudamos público, oferta e concorrência." },
                  { t: "Design que gera desejo", d: "Estética de agência premiada, sem enfeite inútil." },
                  { t: "Engenharia de performance", d: "Código limpo, leve e pronto para escalar." },
                  { t: "Crescimento contínuo", d: "Medimos, ajustamos e evoluímos com dados." },
                ].map((item, i) => (
                  <div key={item.t} className="flex min-w-0 gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-blue)] text-sm font-bold shadow-[var(--glow-sm)]">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold">{item.t}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PORTFÓLIO */}
      <section id="portfolio" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
          <Reveal>
            <SectionLabel>Portfólio conceito</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold sm:text-5xl">
              Doze nichos. <span className="text-gradient">Doze experiências premium.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Projetos conceito criados pelo nosso estúdio para demonstrar padrão visual, estrutura
              de conversão e nível de acabamento. Passe o mouse para percorrer a página inteira.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-14 px-5 sm:gap-20 sm:px-8">
          {concepts.map((c, i) => (
            <ConceptCard key={c.id} concept={c} index={i} />
          ))}
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionLabel>Serviços</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl text-3xl font-extrabold sm:text-5xl">
            Tudo que seu negócio precisa <span className="text-gradient">para existir online.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {servicos.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.03}>
              <article className="glass group relative h-full min-w-0 overflow-hidden rounded-2xl p-6 transition-[transform,box-shadow,border-color] duration-500 [transition-timing-function:var(--ease-premium)] hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[var(--glow-sm)]">
                <s.icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-base font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <span
                  className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-[image:var(--gradient-blue)] transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div
          className="absolute inset-0 grid-lines opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <Reveal>
              <SectionLabel>Diferenciais</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold sm:text-5xl">
                Por que a StudioTech <span className="text-gradient">é outro nível.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {diferenciais.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.04}>
                <article className="glass glow-border h-full min-w-0 rounded-3xl p-7 transition-transform duration-500 [transition-timing-function:var(--ease-premium)] hover:-translate-y-2">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[image:var(--gradient-blue)] shadow-[var(--glow-sm)]">
                    <d.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="relative mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="text-center">
          <Reveal>
            <SectionLabel>Como funciona</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-3xl font-extrabold sm:text-5xl">
              Um processo <span className="text-gradient">sem surpresas.</span>
            </h2>
          </Reveal>
        </div>

        <ol className="relative mt-16 space-y-4">
          <span
            className="absolute top-0 bottom-0 left-5 w-px bg-linear-to-b from-primary/70 via-primary/25 to-transparent sm:left-6"
            aria-hidden="true"
          />
          {processo.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <li className="glass relative ml-0 flex min-w-0 items-start gap-4 rounded-2xl p-5 pl-16 sm:pl-20">
                <span className="absolute top-1/2 left-1 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-[image:var(--gradient-blue)] text-xs font-bold shadow-[var(--glow-sm)] sm:left-2 sm:size-9">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold sm:text-lg">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="text-center">
          <Reveal>
            <SectionLabel>Dúvidas frequentes</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-3xl font-extrabold sm:text-5xl">
              Tudo que você quer <span className="text-gradient">saber antes.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {faq.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="glass rounded-2xl border-none px-5"
              >
                <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline sm:text-base">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section
        id="contato"
        className="relative flex min-h-[90svh] items-center overflow-hidden py-24"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 size-[85vw] max-w-[1000px] -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full bg-[color:var(--royal)]/30 blur-[140px]" />
        </div>
        <div className="absolute inset-0 grid-lines opacity-25" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="text-3xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">
              Seu próximo cliente pode estar pesquisando agora.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold text-gradient sm:text-2xl">
              A pergunta é: sua empresa está preparada para ser encontrada?
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-12">
              <MagneticButton href="#top" size="xl" className="w-full sm:w-auto">
                Quero meu Site Premium <ArrowRight className="size-5" aria-hidden="true" />
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-6 text-xs text-muted-foreground sm:text-sm">
              Resposta em até 24h · Proposta com escopo e prazo fechados
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-2.5">
            <img src={logoImg} alt="StudioTech Logo" className="size-8 shrink-0 rounded-lg object-cover" />
            <span className="truncate font-display text-sm font-extrabold">
              Studio<span className="text-gradient">Tech</span>
            </span>
          </div>
          <p className="text-right text-[11px] text-muted-foreground sm:text-xs">
            © {new Date().getFullYear()} StudioTech · Experiências digitais premium
          </p>
        </div>
      </footer>
    </div>
  );
}
