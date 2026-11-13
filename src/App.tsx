import { FormEvent, useEffect, useState } from "react";

//const A = "/assets/";
const A = `${import.meta.env.BASE_URL}assets/`;

type Page = "home" | "menu";




const featured = [
  ["Iced Latte", "Espresso, leche y mucho hielo.", "$5100", "b30e2.svg"],
  ["Cappuccino", "Espuma cremosa y cacao opcional.", "$4700", "dfe0c.svg"],
  ["Cold Brew", "18 hrs de extracción en frío.", "$5300", "af523.svg"],
  ["Filtrado V60", "Origen del mes, notas frutales.", "$5200", "c6457.svg"],
  ["Flat White", "Doble ristretto y leche sedosa.", "$4900", "6b12e.svg"],
  ["Cortado", "Espresso con un toque de leche.", "$3800", "75da2.svg"],
  ["Chocomocca", "Chocolate intenso, café y leche.", "$3800", "423f8.svg"],
];

const featuredMobile = [
  ["Cortado", "Granos frescos cada semana", "$4800", "8b2a5.svg"],
  ["Café de origen", "Granos frescos cada semana", "$4800", "cf823.svg"],
  ["Café de origen", "Granos frescos cada semana", "$4800", "bef48.svg"],
];

const menuSections = [
  {
    id: "cafe",
    title: "Café",
    products: [
      ["Espresso", "Corto e intenso. Blend de la casa.", "$3.500", "7df6a.svg"],
      ["Cortado", "Espresso con un toque de leche texturizada.", "$3.800", "88641.svg"],
      ["Flat white", "Doble ristretto y leche sedosa.", "$4.900", "8fad2.svg"],
      ["Filtrado V60", "Origen del mes, notas frutales.", "$5.200", "bfecc.svg"],
      ["Chemex para dos", "600 ml para compartir.", "$8.900", "c9305.svg"],
    ],
  },
  {
    id: "frio",
    title: "Frío",
    products: [
      ["Cold Brew", "18 horas de extracción en frío.", "$2.800", "0563f.svg"],
      ["Iced latte", "Espresso con un toque de leche texturizada.", "$5.100", "09e77.svg"],
      ["Espresso tonic", "Doble ristretto y leche sedosa.", "$5.600", "19712.svg"],
    ],
  },
  {
    id: "pasteleria",
    title: "Pastelería",
    products: [
      [
        "Medialunas de manteca",
        "Medialunas de manteca doradas, suaves y esponjosas.",
        "$2.800",
        "b7dc7.svg",
      ],
      ["Croissant de almendras", "Croissant hojaldrado y crocante.", "$4.600", "ae835.svg"],
      ["Torta de chocolate", "Torta de chocolate húmeda e intensa.", "$5.900", "117c7.svg"],
      ["Budín de limón", "Budín de limón esponjoso y húmedo.", "$4.200", "ef6a0.svg"],
    ],
  },
];

function Header({
  cart,
  onNavigate,
  onOpenMenu,
}: {
  cart: number;
  onNavigate: (page: Page) => void;
  onOpenMenu: () => void;
}) {
  return (
    <header className="site-header">
      <button className="logo-button" onClick={() => onNavigate("home")} aria-label="Ir al inicio">
        <img src={`${A}af8fe.svg`} alt="Grano Norte, café de especialidad" />
      </button>
      <nav className="desktop-nav" aria-label="Navegación principal">
        <button onClick={() => onNavigate("home")}>Inicio</button>
        <button onClick={() => onNavigate("menu")}>Carta</button>
        <button onClick={() => onNavigate("home")}>Nosotros</button>
        <button onClick={() => onNavigate("menu")}>Tienda</button>
        <button onClick={() => onNavigate("home")}>Locales</button>
      </nav>
      <div className="header-actions">
        <button
          className="shop-button"
          onClick={() => onNavigate("menu")}
          aria-label={`Tienda, ${cart} productos`}
        >
          <picture>
            <source media="(min-width: 1000px)" srcSet={`${A}4848b.svg`} />
            <img src={`${A}b6b17.svg`} alt="" />
          </picture>
          {cart > 0 && <span>{cart}</span>}
        </button>
        <button className="hamburger" onClick={onOpenMenu} aria-label="Abrir menú">
          <img src={`${A}4ec60.svg`} alt="" />
        </button>
      </div>
    </header>
  );
}

function MenuOverlay({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: (page: Page) => void;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  const go = (page: Page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className="menu-overlay" role="dialog" aria-modal="true" aria-label="Menú principal">
      <button className="close-menu" onClick={onClose} aria-label="Cerrar menú">
        <img src={`${A}d40dd.svg`} alt="" />
      </button>
      <nav>
        <button onClick={() => go("home")}>Inicio</button>
        <button onClick={() => go("menu")}>Carta</button>
        <button onClick={() => go("home")}>Nosotros</button>
        <button onClick={() => go("menu")}>Tienda</button>
        <button onClick={() => go("home")}>Locales</button>
      </nav>
      <a className="primary full" href="mailto:reservas@granonorte.com.ar">
        Reservar Mesa
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <img className="footer-logo" src={`${A}8c98b.svg`} alt="Grano Norte" />
      <div className="footer-columns">
        <div>
          <strong>LOCALES</strong>
          <p>Palermo — Gorriti 4820, CABA</p>
          <p>Centro — Florida 655, CABA</p>
        </div>
        <div>
          <strong>HORARIOS</strong>
          <p>Lun a Vie-8 a 20 hs</p>
          <p>Sab a Dom-9 a 21 hs</p>
        </div>
        <div>
          <strong>CONTACTOS</strong>
          <p>hola@granonorte.com.ar</p>
          <p>+54 11 5555-0123</p>
          <p>@granonorte</p>
        </div>
      </div>
      <small>© 2026 Grano Norte. Proyecto educativo, marca ficticia.</small>
    </footer>
  );
}

function Newsletter() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section className="newsletter">
      <div className="section-inner">
        <span className="eyebrow">NEWSLETTER</span>
        <h2>Un mail por mes con el café del mes y nada más</h2>
        {sent ? (
          <p className="success" role="status">
            Listo, ya estás en la lista.
          </p>
        ) : (
          <form onSubmit={submit}>
            <label htmlFor="email">Tu Email</label>
            <div>
              <input id="email" type="email" required placeholder="tu@email.com" />
              <button className="primary" type="submit">
                Suscribime
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Home({ onMenu, addProduct }: { onMenu: () => void; addProduct: () => void }) {
  const reviews = [
    ['"El flat white más rico de Palermo. Y te lo sirven con una sonrisa."', "Caro M., diseñadora"],
    [
      '"Vengo a trabajar casi todos los días. Buen café, buena música, wifi que anda."',
      "Nico R., desarrollador",
    ],
    ['"Compré el Etiopía para casa y no vuelvo al café de supermercado."', "Lu P., estudiante"],
  ];

  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">CAFÉ DE ESPECIALIDAD - BUENOS AIRES</span>
            <h1>Café de origen, tostado acá a la vuelta.</h1>
            <p>Granos frescos cada semana, baristas que te conocen por tu nombre.</p>
            <div className="hero-buttons">
              <a className="primary" href="mailto:reservas@granonorte.com.ar">
                Reservar Mesa
              </a>
              <button className="secondary light" onClick={onMenu}>
                Ver la Carta
              </button>
            </div>
          </div>
        </section>

        <section className="benefits">
          {[
            [
              "3694e.svg",
              "23eb2.svg",
              "Tostado cada martes",
              "Nunca vas a tomar un café de más de 15 días.",
            ],
            ["45072.svg", "9b4c8.svg", "Wifi y enchufes", "Mesas largas para trabajar tranquilo."],
            [
              "9283e.svg",
              "a2b8b.svg",
              "Pedí y retirá",
              "Nunca vas a tomar un café de más de 15 días.",
            ],
          ].map(([icon, mobileIcon, title, text]) => (
            <article key={title}>
              <picture>
                <source media="(min-width: 700px)" srcSet={`${A}${icon}`} />
                <img src={`${A}${mobileIcon}`} alt="" />
              </picture>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="popular">
          <div className="section-inner">
            <h2>Lo que más se pide</h2>
            <div className="product-scroller desktop-products">
              {featured.map(([title, description, price, image]) => (
                <article className="product-card" key={title}>
                  <img src={`${A}${image}`} alt={title} />
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span>{price}</span>
                    <button className="primary small-button" onClick={addProduct}>
                      Agregar
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="product-scroller mobile-products">
              {featuredMobile.map(([title, description, price, image]) => (
                <article className="product-card" key={`${title}-${image}`}>
                  <img src={`${A}${image}`} alt={title} />
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span>{price}</span>
                    <button className="primary small-button" onClick={addProduct}>
                      Agregar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="story">
          <div className="story-copy">
            <span className="eyebrow">DEL GRANO A TU TAZA</span>
            <h2>Del grano a tu taza</h2>
            <p>
              Empezamos en 2019 con una tostadora de 5 kg y muchas ganas. Hoy trabajamos directo con
              4 fincas y tostamos 300 kg por mes.
            </p>
            <button className="secondary">Conocé nuestra historia</button>
          </div>
          <picture>
            <source media="(min-width: 1000px)" srcSet={`${A}01844.svg`} />
            <source media="(min-width: 700px)" srcSet={`${A}a1017.svg`} />
            <img src={`${A}3aeca.svg`} alt="Granos de café recién tostados" />
          </picture>
        </section>

        <section className="reviews">
          <div className="section-inner">
            <h2>Lo que dicen</h2>
            <div className="review-grid">
              {reviews.map(([quote, author]) => (
                <article key={author}>
                  <div className="stars">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <img key={star} src={`${A}65947.svg`} alt="" />
                    ))}
                  </div>
                  <p>{quote}</p>
                  <small>{author}</small>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Newsletter />
        <section className="maps" aria-label="Nuestros locales">
          <img src={`${A}7511a.svg`} alt="Mapa de la sucursal Palermo" />
          <img src={`${A}f35cb.svg`} alt="Mapa de la sucursal Centro" />
        </section>
      </main>
      <Footer />
    </>
  );
}

function MenuPage() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <>
      <main className="menu-page">
        <section className="menu-intro">
          <span className="eyebrow">CARTA</span>
          <h1>Lo que tomás acá</h1>
          <p>Café de especialidad, tostado acá a la vuelta.</p>
          <div className="filters">
            <button onClick={() => scrollTo("cafe")}>Todo</button>
            <button onClick={() => scrollTo("cafe")}>Café</button>
            <button onClick={() => scrollTo("frio")}>Frío</button>
            <button onClick={() => scrollTo("pasteleria")}>Pastelería</button>
          </div>
        </section>
        {menuSections.map((section) => (
          <section className="menu-section" id={section.id} key={section.id}>
            <h2>{section.title}</h2>
            <div className="menu-products">
              {section.products.map(([title, description, price, image]) => (
                <article className="menu-product" key={title}>
                  <img src={`${A}${image}`} alt={title} />
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <strong>{price}</strong>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState(0);

  const navigate = (next: Page) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="app-shell">
      <Header cart={cart} onNavigate={navigate} onOpenMenu={() => setMenuOpen(true)} />
      {page === "home" ? (
        <Home onMenu={() => navigate("menu")} addProduct={() => setCart((value) => value + 1)} />
      ) : (
        <MenuPage />
      )}
      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} onNavigate={navigate} />}
    </div>
  );
}
