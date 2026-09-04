import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  return (
    <header className="site-header" data-consafedev-header>
      <a className="site-header__brand" href="#inicio" aria-label="ConSafeDev — inicio">
        <BrandMark className="site-header__logo" />
      </a>

      <nav className="site-header__nav" aria-label="Navegación principal">
        <a href="#sistema">Cómo lo hacemos</a>
        <a href="#capacidades">Qué construimos</a>
      </nav>

      <a className="site-header__cta" href="#contacto">
        Hablemos de lo que necesitas resolver
        <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
