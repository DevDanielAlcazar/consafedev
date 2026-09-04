import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a href="#inicio" aria-label="Volver al inicio" className="site-footer__brand">
        <BrandMark className="site-footer__logo" />
      </a>
      <p>Software a medida para problemas que merecen algo mejor que una plantilla.</p>
      <div className="site-footer__links">
        <a href="#sistema">Cómo lo hacemos</a>
        <a href="#capacidades">Qué construimos</a>
        <a href="#contacto">Contacto</a>
      </div>
      <small>© {new Date().getFullYear()} ConSafeDev.</small>
    </footer>
  );
}
