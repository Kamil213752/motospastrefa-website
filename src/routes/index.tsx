import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/motospastrefa-logo.png";
import heroImg from "@/assets/hero-car.jpg";
import washImg from "@/assets/service-wash.jpg";
import polishImg from "@/assets/service-polish.jpg";
import interiorImg from "@/assets/service-interior.jpg";
import {
  Sparkles, Shield, Droplets, Sofa, Wrench, Phone, Mail, MapPin,
  Instagram, Facebook, ArrowRight, Check, Star, Menu, X,
} from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useState, useEffect, type ReactNode } from "react";
import { useForm, ValidationError } from "@formspree/react";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { icon: Droplets, title: "Mycie Detailingowe", desc: "Bezdotykowe mycie wstępne aktywną pianą, ręczne mycie na dwa wiadra, czyszczenie felg, osuszanie mikrofibrą, mycie szyb, dressing opon.", img: washImg },
  { icon: Sofa, title: "Detailing Wnętrza", desc: "Drobiazgowe odkurzanie kabiny i bagażnika, czyszczenie kokpitu i tworzyw, antystatyczny dressing wnętrza, czyszczenie progów i wnęk.", img: interiorImg },
  { icon: Shield, title: "Detailing Skór i Lakieru", desc: "Profesjonalne czyszczenie i impregnacja skór, nabłyszczanie lakieru wykończeniowe, maskowanie mikrorys, głęboki połysk.", img: polishImg },
  { icon: Wrench, title: "Dodatki Premium", desc: "Aplikacja twardego wosku, niewidzialna wycieraczka hydrofobowa, konserwacja uszczelek przed starzeniem.", img: polishImg },
];

const packages = [
  {
    name: "Strefa Start",
    price: "250",
    tag: "Bezpieczna pielęgnacja podstawowa",
    features: [
      "Bezdotykowe mycie wstępne aktywną pianą",
      "Ręczne mycie detailingowe na dwa wiadra",
      "Czyszczenie felg dedykowaną chemią",
      "Bezpieczne osuszanie mikrofibrą",
      "Mycie szyb bezsmugowe",
      "Premium dressing opon (efekt hydrofobowy)"
    ],
  },
  {
    name: "Strefa Standard",
    price: "350",
    tag: "Pełny pakiet z detailingiem wnętrza",
    featured: true,
    features: [
      "Pełny pakiet Strefy START",
      "Drobiazgowe odkurzanie kabiny i bagażnika",
      "Czyszczenie kokpitu i tworzyw",
      "Antystatyczny dressing wnętrza (ochrona UV)",
      "Czyszczenie progów i wnęk drzwiowych",
      "Obustronne mycie szyb",
      "Odświeżenie zapachu kabiny"
    ],
  },
  {
    name: "Strefa Premium",
    price: "450",
    tag: "Maksymalna ochrona i estetyka",
    features: [
      "Pełny pakiet Strefy STANDARD",
      "Profesjonalne czyszczenie i impregnacja skór",
      "Nabłyszczanie lakieru wykończeniowe",
      "Maskowanie mikrorys",
      "Głęboki połysk i ochrona koloru"
    ],
  },
];

const addons = [
  {
    name: "Aplikacja twardego wosku Premium",
    price: "400 zł",
    desc: "Długotrwała ochrona lakieru, silny efekt hydrofobowy (zrzucanie wody) i łatwiejsze bieżące mycie."
  },
  {
    name: "Niewidzialna wycieraczka",
    price: "70 zł",
    desc: "Nałożenie powłoki hydrofobowej na szybę czołową – poprawa widoczności w deszczu (odprowadzanie wody pędem powietrza)."
  },
  {
    name: "Konserwacja uszczelek",
    price: "200 zł",
    desc: "Zabezpieczenie elementów gumowych profesjonalnym środkiem przed starzeniem, promieniowaniem UV oraz przymarzaniem zimą."
  },
];

const marqueeItems = [
  "Powłoki Ceramiczne", "Ręczne Mycie", "Detailing Wnętrza",
  "Ochrona Lakieru", "Renowacja Reflektorów", "Dezynfekcja Ozonem",
];

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-gradient opacity-[0.12] blur-3xl animate-orb" />
        <div className="absolute top-1/3 -right-40 h-[480px] w-[480px] rounded-full bg-purple-gradient opacity-[0.10] blur-3xl animate-orb" style={{ animationDelay: "-6s" }} />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-purple-gradient opacity-[0.08] blur-3xl animate-orb" style={{ animationDelay: "-10s" }} />
      </div>

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/50">
        <MobileNav />
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center bg-hero pt-24 sm:pt-28">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" aria-hidden />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-20 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          <div className="lg:col-span-7 animate-float-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border-glow glass px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-purple-metal font-semibold mb-5 sm:mb-6">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Detailing • Kosmetyka Aut • Ochrona</span>
            </div>
            <h1 className="font-display text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl tracking-tight">
              <span className="text-metal">TWOJE AUTO</span><br />
              <span className="text-shimmer">ZASŁUGUJE</span><br />
              <span className="text-metal">NA WIĘCEJ.</span>
            </h1>
            <p className="mt-6 sm:mt-8 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-muted-foreground leading-relaxed">
              W MotoSpaStrefa łączymy pasję i precyzję. Ręczne mycie, korekta lakieru, powłoki ceramiczne i pełen detailing — wszystko po to, by Twój samochód wyglądał lepiej niż w dniu zakupu.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <a href="#kontakt" className="inline-flex items-center justify-center gap-2 rounded-full btn-premium shine px-6 sm:px-8 py-3.5 sm:py-4 font-semibold text-primary-foreground">
                Zarezerwuj termin <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#uslugi" className="group inline-flex items-center justify-center gap-2 rounded-full border border-border glass px-6 sm:px-8 py-3.5 sm:py-4 font-semibold text-foreground hover:border-primary/50 hover:-translate-y-0.5 transition">
                Zobacz usługi
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="mt-10 sm:mt-14 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-1">
                {[0,1,2,3,4].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-purple-glow text-purple-glow drop-shadow-[0_0_6px_oklch(0.6_0.25_300/0.7)]" />
                ))}
              </div>
              <div>
                <div className="font-display text-2xl text-purple-metal leading-none">5,0</div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-1">Ocena klientów</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center animate-float-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative animate-float-y">
              <div className="absolute inset-0 bg-purple-gradient rounded-full blur-3xl opacity-40 animate-glow-pulse" />
              <div className="absolute inset-8 rounded-full border border-primary/20" />
              <div className="absolute inset-16 rounded-full border border-primary/10" />
              <img
                src={logoAsset}
                alt="MotoSpaStrefa Logo"
                className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[460px] lg:w-[460px] object-contain drop-shadow-[0_0_60px_rgba(168,85,247,0.5)]"
                width={460}
                height={460}
              />
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground/70">
          <span>scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative py-6 border-y border-border/40 bg-card/30 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="inline-flex items-center gap-4 sm:gap-6 mx-5 sm:mx-8 font-display text-lg sm:text-2xl tracking-[0.2em] sm:tracking-[0.25em] text-muted-foreground/60">
              {m}
              <span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="uslugi" className="relative py-20 sm:py-28 lg:py-32 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
              <div className="text-xs uppercase tracking-[0.35em] text-purple-metal font-semibold mb-4">Nasze Usługi</div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-metal">SZTUKA DETAILINGU</h2>
              <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="mt-6 text-muted-foreground text-lg">
                Od ręcznego mycia po powłoki ceramiczne premium — kompleksowa pielęgnacja Twojego samochodu.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="group relative overflow-hidden rounded-2xl card-gradient-border shadow-card-premium transition-all duration-500 hover:-translate-y-2 hover:shadow-glow-strong h-full">
                  <div className="relative h-52 overflow-hidden">
                    <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    <div className="absolute top-4 left-4 inline-flex items-center justify-center h-11 w-11 rounded-xl btn-premium">
                      <s.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="p-6 relative">
                    <h3 className="font-display text-2xl tracking-wide text-foreground group-hover:text-purple-metal transition-colors">{s.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary/80 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      Dowiedz się więcej <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BAND */}
      <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-purple-gradient opacity-10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${washImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <Reveal>
          <div className="relative max-w-5xl mx-auto text-center px-5 sm:px-6">
            <div className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.4em] text-purple-metal mb-6">— Nasza filozofia —</div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-metal leading-tight">
              „PRECYZJA, PASJA<br />I EFEKT, KTÓRY WIDAĆ."
            </h2>
            <p className="mt-8 text-muted-foreground max-w-2xl mx-auto text-lg">
              Każde auto traktujemy indywidualnie. Wykorzystujemy wyłącznie sprawdzone, profesjonalne produkty detailingowe, które gwarantują bezpieczeństwo i efekt premium.
            </p>
          </div>
        </Reveal>
      </section>

      {/* PACKAGES */}
      <section id="pakiety" className="py-20 sm:py-28 lg:py-32 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
              <div className="text-xs uppercase tracking-[0.35em] text-purple-metal font-semibold mb-4">Pakiety</div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-metal">WYBIERZ SWOJĄ STREFĘ</h2>
              <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="mt-6 text-muted-foreground text-lg">Trzy pakiety dopasowane do każdego auta i budżetu.</p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {packages.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <div
                  className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 h-full ${
                    p.featured
                      ? "card-gradient-border shadow-glow-strong lg:scale-[1.03]"
                      : "card-gradient-border shadow-card-premium hover:shadow-glow"
                  }`}
                >
                  {p.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full btn-premium px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground shine">
                      Bestseller
                    </div>
                  )}
                  <div className="text-xs uppercase tracking-[0.25em] text-purple-metal font-semibold">{p.tag}</div>
                  <h3 className="mt-2 font-display text-3xl sm:text-4xl text-metal">{p.name}</h3>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-sm text-muted-foreground">od</span>
                    <span className="font-display text-5xl sm:text-6xl text-foreground">{p.price}</span>
                    <span className="text-lg text-muted-foreground">zł</span>
                  </div>
                  <div className="mt-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 ring-1 ring-primary/40">
                          <Check className="h-3 w-3 text-primary" />
                        </span>
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#kontakt"
                    className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold shine transition ${
                      p.featured
                        ? "btn-premium text-primary-foreground"
                        : "border border-border bg-secondary text-foreground hover:bg-secondary/70 hover:border-primary/40"
                    }`}
                  >
                    Wybierz pakiet <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ADDONS */}
      <section className="py-20 sm:py-28 lg:py-32 px-5 sm:px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
              <div className="text-xs uppercase tracking-[0.35em] text-purple-metal font-semibold mb-4">🛠️ Strefa Dodatków</div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-metal">ROZSZERZ SWÓJ PAKIET</h2>
              <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="mt-6 text-muted-foreground text-lg">Dodatkowe zabiegi dla jeszcze lepszych efektów.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {addons.map((addon, i) => (
              <Reveal key={addon.name} delay={i * 100}>
                <div className="relative rounded-2xl card-gradient-border shadow-card-premium p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display text-xl sm:text-2xl text-metal">{addon.name}</h3>
                    <div className="text-lg sm:text-xl font-semibold text-primary">{addon.price}</div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{addon.desc}</p>
                  <a
                    href="#kontakt"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-purple-metal transition"
                  >
                    Dodaj do rezerwacji <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="o-nas" className="py-20 sm:py-28 lg:py-32 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-purple-metal font-semibold mb-4">Dlaczego my?</div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-metal">NAJWYŻSZY POZIOM<br />PIELĘGNACJI AUT</h2>
              <div className="mt-6 h-px w-24 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
              <p className="mt-8 text-muted-foreground text-lg leading-relaxed">
                MotoSpaStrefa to miejsce, gdzie pasja spotyka się z perfekcją. Każdy detal jest dla nas równie ważny — od pierwszego płynu, po ostatni dotyk mikrofibry. Twój samochód zasługuje na najlepszą opiekę, a my dajemy z siebie wszystko, by spełnić te oczekiwania.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Pracujemy z zaangażowaniem, precyzją i dbałością, które widać gołym okiem. Niezależnie od marki i modelu — traktujemy każde auto jak własne, z pełnym szacunkiem i profesjonalizmem.
              </p>
              <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                {[
                  "Maksymalna precyzja w każdym calu karoserii",
                  "Najwyższa jakość produktów i technik detailingowych",
                  "Indywidualne podejście do każdego pojazdu",
                  "Efekt, który przyciąga spojrzenia i zachwyca",
                ].map((f, i) => (
                  <Reveal key={f} delay={200 + i * 100}>
                    <div className="flex items-start gap-3 rounded-xl p-3 hover:bg-card/60 transition">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--purple-glow)] shrink-0" />
                      <span className="text-sm text-foreground/90 leading-relaxed">{f}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-purple-gradient opacity-20 blur-3xl rounded-3xl group-hover:opacity-30 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-3xl card-gradient-border">
                <img src={interiorImg} alt="Studio detailingu MotoSpaStrefa" loading="lazy" className="w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="py-20 sm:py-28 lg:py-32 px-5 sm:px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-16">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-purple-metal font-semibold mb-4">Kontakt</div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-metal">UMÓW WIZYTĘ</h2>
              <div className="mt-6 h-px w-24 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
              <p className="mt-6 text-muted-foreground text-base sm:text-lg max-w-lg">
                Zadzwoń, napisz lub wpadnij do naszego studia. Chętnie doradzimy najlepsze rozwiązanie dla Twojego auta.
              </p>
              <div className="mt-10 space-y-3 sm:space-y-4">
                {[
                  { Icon: Phone, label: "Telefon", value: "+48 797 295 306", href: "tel:+48797295306" },
                  { Icon: Mail, label: "E-mail", value: "kontakt@motospastrefa.com", href: "mailto:kontakt@motospastrefa.com" },
                  { Icon: MapPin, label: "Adres", value: "Pogórze, ul. Ludwika Mierosławskiego 9, 81-198" },
                ].map(({ Icon, label, value, href }) => {
                  const inner = (
                    <>
                      <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl btn-premium">
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
                        <div className="font-display text-base sm:text-xl md:text-2xl text-foreground group-hover:text-purple-metal transition break-words">{value}</div>
                      </div>
                    </>
                  );
                  return href ? (
                    <a key={label} href={href} className="flex items-center gap-3 sm:gap-4 group rounded-2xl p-3 -mx-3 hover:bg-card/60 transition">{inner}</a>
                  ) : (
                    <div key={label} className="flex items-center gap-3 sm:gap-4 rounded-2xl p-3 -mx-3">{inner}</div>
                  );
                })}
              </div>
              <div className="mt-10 flex gap-3">
                <a href="#" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-border glass hover:border-primary hover:text-purple-metal hover:-translate-y-0.5 transition"><Instagram className="h-4 w-4" /></a>
                <a href="https://www.facebook.com/profile.php?id=61591684987173" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-border glass hover:border-primary hover:text-purple-metal hover:-translate-y-0.5 transition"><Facebook className="h-4 w-4" /></a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 py-10 sm:py-12 px-5 sm:px-6 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <img src={logoAsset} alt="MotoSpaStrefa" className="h-10 w-10 object-contain" />
            <span className="font-display text-base sm:text-lg tracking-[0.25em] text-metal">MOTOSPASTREFA</span>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">© {new Date().getFullYear()} MotoSpaStrefa. Wszystkie prawa zastrzeżone.</div>
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-purple-metal font-semibold">Detailing • Kosmetyka • Ochrona</div>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, placeholder, name, type = "text" }: { label: string; placeholder: string; name: string; type?: string }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-lg bg-input/50 border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
      />
    </div>
  );
}

function ContactForm() {
  const [state, handleSubmit] = useForm("mvzjegzd");

  if (state.succeeded) {
    return (
      <div className="relative rounded-3xl card-gradient-border shadow-card-premium p-6 sm:p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-metal">DZIĘKUJEMY!</h3>
          <p className="text-muted-foreground">Twoje zapytanie zostało wysłane. Skontaktujemy się z Tobą wkrótce.</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 rounded-full btn-premium shine px-6 py-3 font-semibold text-primary-foreground"
          >
            Wyślij kolejne zapytanie
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative rounded-3xl card-gradient-border shadow-card-premium p-6 sm:p-8 space-y-5">
      <h3 className="font-display text-2xl sm:text-3xl text-metal">FORMULARZ REZERWACJI</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Imię" placeholder="Jan" name="name" />
        <Field label="Telefon" placeholder="+48 ..." name="phone" type="tel" />
      </div>
      <Field label="Model auta" placeholder="np. BMW M3" name="car" />
      <div>
        <label className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">Wybrany pakiet</label>
        <select name="package" className="w-full rounded-lg bg-input/50 border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition">
          <option>Strefa Start</option>
          <option>Strefa Standard</option>
          <option>Strefa Premium</option>
          <option>Dodatki / konsultacja</option>
        </select>
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">Wiadomość</label>
        <textarea name="message" rows={4} className="w-full rounded-lg bg-input/50 border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition resize-none" placeholder="Opisz stan auta i oczekiwania..." />
        <ValidationError field="message" errors={state.errors} />
      </div>
      <button type="submit" disabled={state.submitting} className="w-full inline-flex items-center justify-center gap-2 rounded-full btn-premium shine px-6 py-4 font-semibold text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed">
        {state.submitting ? "Wysyłanie..." : "Wyślij zapytanie"} <ArrowRight className="h-4 w-4" />
      </button>
      {state.errors && (
        <div className="text-red-500 text-sm">Wystąpił błąd. Spróbuj ponownie.</div>
      )}
    </form>
  );
}

const navLinks = [
  { h: "#uslugi", l: "Usługi" },
  { h: "#pakiety", l: "Pakiety" },
  { h: "#o-nas", l: "O nas" },
  { h: "#kontakt", l: "Kontakt" },
];

function MobileNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
      <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-3 group min-w-0">
        <img src={logoAsset} alt="MotoSpaStrefa" className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 object-contain transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105" />
        <span className="font-display text-base sm:text-xl tracking-[0.2em] sm:tracking-[0.25em] text-metal truncate">MOTOSPASTREFA</span>
      </a>
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        {navLinks.map((i) => (
          <li key={i.h}>
            <a href={i.h} className="link-underline hover:text-foreground transition-colors">{i.l}</a>
          </li>
        ))}
      </ul>
      <a href="#kontakt" className="hidden md:inline-flex items-center gap-2 rounded-full btn-premium shine px-5 py-2.5 text-sm font-semibold text-primary-foreground shrink-0">
        Umów wizytę <ArrowRight className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Otwórz menu"
        className="md:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border glass text-foreground"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[86%] max-w-sm glass border-l border-border/50 p-6 flex flex-col transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logoAsset} alt="" className="h-9 w-9 object-contain" />
              <span className="font-display text-sm tracking-[0.25em] text-metal">MENU</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Zamknij menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="mt-10 space-y-2">
            {navLinks.map((i) => (
              <li key={i.h}>
                <a
                  href={i.h}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl tracking-wide text-foreground hover:bg-card/60 hover:text-purple-metal transition"
                >
                  {i.l} <ArrowRight className="h-4 w-4 text-primary" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-full btn-premium shine px-6 py-4 font-semibold text-primary-foreground"
          >
            Umów wizytę <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}

