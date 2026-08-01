import { useRef, useState } from "react";
import { Monitor, Smartphone, Tablet, MousePointerClick } from "lucide-react";
import { Reveal } from "./atoms";

import barbearia from "@/assets/concept-barbearia.jpg";
import academia from "@/assets/concept-academia.jpg";
import odonto from "@/assets/concept-odonto.jpg";
import sorveteria from "@/assets/concept-sorveteria.jpg";
import restaurante from "@/assets/concept-restaurante.jpg";
import advogado from "@/assets/concept-advogado.jpg";
import estetica from "@/assets/concept-estetica.jpg";
import imobiliaria from "@/assets/concept-imobiliaria.jpg";
import concessionaria from "@/assets/concept-concessionaria.jpg";
import petshop from "@/assets/concept-petshop.jpg";
import hotel from "@/assets/concept-hotel.jpg";
import construtora from "@/assets/concept-construtora.jpg";

export type Concept = {
  id: string;
  nicho: string;
  nome: string;
  descricao: string;
  recursos: string[];
  img: string;
};

export const concepts: Concept[] = [
  {
    id: "barbearia",
    nicho: "Barbearia Premium",
    nome: "Nero Barber Club",
    descricao:
      "Uma experiência escura e sofisticada, pensada para transformar visitantes em agendamentos. Hierarquia visual forte, prova social e um caminho único até o botão de reserva.",
    recursos: ["Agendamento online", "Galeria de cortes", "Tabela de serviços", "Integração WhatsApp"],
    img: barbearia,
  },
  {
    id: "academia",
    nicho: "Academia",
    nome: "Forge Performance",
    descricao:
      "Energia, movimento e planos claros. A estrutura conduz o visitante do impacto inicial direto para a matrícula, com prova de resultados no meio do caminho.",
    recursos: ["Planos comparativos", "Grade de aulas", "Antes e depois", "Matrícula em 2 cliques"],
    img: academia,
  },
  {
    id: "odonto",
    nicho: "Clínica Odontológica",
    nome: "Clareo Odontologia",
    descricao:
      "Confiança em primeiro lugar: linguagem limpa, respiro generoso e credibilidade médica visível antes de qualquer pedido de contato.",
    recursos: ["Tratamentos detalhados", "Corpo clínico", "Agendamento", "Depoimentos reais"],
    img: odonto,
  },
  {
    id: "sorveteria",
    nicho: "Sorveteria",
    nome: "Gelatto Bianco",
    descricao:
      "Cor, apetite e delivery. Um conceito lúdico que mantém disciplina de conversão: sabor em destaque, pedido sempre a um toque de distância.",
    recursos: ["Cardápio de sabores", "Pedido delivery", "Lojas e mapa", "Promoções sazonais"],
    img: sorveteria,
  },
  {
    id: "restaurante",
    nicho: "Restaurante",
    nome: "Casa Aurora",
    descricao:
      "Gastronomia tratada como cinema. Fotografia em tela cheia, menu tipográfico elegante e reserva integrada sem fricção.",
    recursos: ["Menu digital", "Reserva de mesas", "História do chef", "Galeria imersiva"],
    img: restaurante,
  },
  {
    id: "advogado",
    nicho: "Advocacia",
    nome: "Vasconcelos & Advogados",
    descricao:
      "Autoridade construída com sobriedade. Áreas de atuação organizadas, conteúdo jurídico e captação de casos qualificados.",
    recursos: ["Áreas de atuação", "Blog jurídico", "Formulário de caso", "SEO local"],
    img: advogado,
  },
  {
    id: "estetica",
    nicho: "Clínica Estética",
    nome: "Lumière Estética",
    descricao:
      "Delicadeza com performance. Protocolos apresentados como transformação, com resultados e agendamento conectados ao funil.",
    recursos: ["Protocolos estéticos", "Antes e depois", "Agenda online", "Remarketing pronto"],
    img: estetica,
  },
  {
    id: "imobiliaria",
    nicho: "Imobiliária",
    nome: "Habita Prime",
    descricao:
      "Busca inteligente na primeira dobra e vitrine de imóveis de alto padrão. Cada card foi desenhado para gerar visita agendada.",
    recursos: ["Filtro avançado", "Ficha de imóvel", "Mapa interativo", "Corretor direto"],
    img: imobiliaria,
  },
  {
    id: "concessionaria",
    nicho: "Concessionária",
    nome: "Motorline Drive",
    descricao:
      "Showroom digital escuro e cinematográfico, com estoque, simulador de financiamento e test drive em fluxo contínuo.",
    recursos: ["Estoque dinâmico", "Simulador de parcelas", "Test drive", "Avaliação de usado"],
    img: concessionaria,
  },
  {
    id: "petshop",
    nicho: "Pet Shop",
    nome: "Patinhas & Cia",
    descricao:
      "Afeto com estrutura comercial: serviços, loja e agendamento de banho e tosa convivendo sem poluição visual.",
    recursos: ["Banho e tosa online", "Loja virtual", "Plano de assinatura", "Clube de vantagens"],
    img: petshop,
  },
  {
    id: "hotel",
    nicho: "Hotel",
    nome: "Marèa Boutique Hotel",
    descricao:
      "Desejo em tela cheia e reserva sem atrito. O motor de datas aparece antes da rolagem, onde a conversão realmente acontece.",
    recursos: ["Motor de reservas", "Tipos de suíte", "Experiências", "Multi-idioma"],
    img: hotel,
  },
  {
    id: "construtora",
    nicho: "Construtora",
    nome: "Estrutura Nova",
    descricao:
      "Solidez traduzida em design: portfólio de obras, números da empresa e captação de investidores e compradores.",
    recursos: ["Portfólio de obras", "Andamento da obra", "Números e selos", "Captação de leads"],
    img: construtora,
  },
];

function DeviceIcon({ icon: Icon, label }: { icon: typeof Monitor; label: string }) {
  return (
    <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-muted-foreground">
      <Icon className="size-3.5 text-primary" aria-hidden="true" />
      {label}
    </span>
  );
}

export function ConceptCard({ concept, index }: { concept: Concept; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1400px) rotateY(${px * 7}deg) rotateX(${-py * 6}deg) translateZ(0)`;
  };

  const reset = () => {
    setHover(false);
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(1400px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <Reveal className="w-full">
      <article
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={reset}
        className="glass glow-border group relative grid gap-8 overflow-hidden rounded-3xl p-5 transition-[box-shadow,transform] duration-700 [transition-timing-function:var(--ease-premium)] hover:shadow-[var(--glow-md)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:p-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 size-72 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        />

        {/* Mockups */}
        <div className="relative min-w-0">
          {/* Notebook */}
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="glass-strong rounded-t-xl border-b-0 p-2 sm:rounded-t-2xl sm:p-3">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-destructive/70" />
                <span className="size-2 rounded-full bg-primary/50" />
                <span className="size-2 rounded-full bg-muted-foreground/40" />
                <span className="ml-2 hidden truncate rounded-full bg-background/60 px-3 py-0.5 text-[10px] text-muted-foreground sm:block">
                  {concept.id}.com.br
                </span>
              </div>
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-background">
                <img
                  src={concept.img}
                  alt={`Conceito de site para ${concept.nicho} — ${concept.nome}`}
                  width={768}
                  height={1920}
                  loading="lazy"
                  decoding="async"
                  className="w-full origin-top transition-transform ease-linear will-change-transform"
                  style={{
                    transform: hover ? "translateY(-75%)" : "translateY(0)",
                    transitionDuration: hover ? "7000ms" : "900ms",
                  }}
                />
              </div>
            </div>
            <div className="mx-auto h-2.5 w-[108%] max-w-none -translate-x-[3.7%] rounded-b-xl bg-[image:var(--gradient-blue)] opacity-70 sm:h-3" />
          </div>

          {/* Tablet + Celular */}
          <div className="pointer-events-none absolute -bottom-6 left-0 flex items-end gap-3 sm:-bottom-8 sm:left-2">
            <div className="glass-strong hidden w-24 rounded-xl p-1 shadow-[var(--glow-sm)] sm:block md:w-28">
              <div className="aspect-3/4 overflow-hidden rounded-lg bg-background">
                <img
                  src={concept.img}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="w-full"
                />
              </div>
            </div>
            <div className="glass-strong w-16 rounded-2xl p-1 shadow-[var(--glow-sm)] md:w-20">
              <div className="aspect-9/19 overflow-hidden rounded-xl bg-background">
                <img
                  src={concept.img}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="mt-10 min-w-0 sm:mt-12 lg:mt-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
              {String(index + 1).padStart(2, "0")} / {concept.nicho}
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">{concept.nome}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {concept.descricao}
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {concept.recursos.map((r) => (
              <li
                key={r}
                className="flex min-w-0 items-center gap-2 text-sm text-foreground/85"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
                <span className="truncate">{r}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <DeviceIcon icon={Monitor} label="Notebook" />
            <DeviceIcon icon={Tablet} label="Tablet" />
            <DeviceIcon icon={Smartphone} label="Celular" />
          </div>

          <button
            type="button"
            onClick={() => setHover((v) => !v)}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-blue)] px-6 py-3 text-sm font-semibold shadow-[var(--glow-sm)] transition-shadow duration-500 hover:shadow-[var(--glow-md)]"
          >
            <MousePointerClick className="size-4" aria-hidden="true" />
            Visual Conceito
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            Passe o mouse (ou toque no botão) para percorrer a página inteira do conceito.
          </p>
        </div>
      </article>
    </Reveal>
  );
}
