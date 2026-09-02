'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Logo } from './logo';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverClarity, setIsOverClarity] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    const clarityBoundary = document.querySelector('.cs-clarity-boundary');
    if (!clarityBoundary || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsOverClarity(entry.isIntersecting),
      { rootMargin: '0px', threshold: 0 },
    );
    observer.observe(clarityBoundary);
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`cs-header${isOverClarity ? ' cs-header--light' : ''}`}>
      <nav className="cs-header__inner" aria-label="Navegación principal">
        <Link className="cs-brand" href="/" aria-label="ConSafeDev, inicio">
          <Logo />
          <span>
            ConSafe<span className="cs-brand__dev">Dev</span>
          </span>
        </Link>

        <div className="cs-header__actions">
          <Link className="cs-header__text-link" href="#v4a-scene">
            Cómo lo hacemos
          </Link>
          <Link className="cs-header__cta" href="#v4a-scene">
            Hablemos de lo que necesitas resolver
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="cs-header__menu-button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {isOpen ? (
          <div id="mobile-navigation" className="cs-mobile-menu">
            <Link href="#v4a-scene" onClick={() => setIsOpen(false)}>
              Cómo lo hacemos
            </Link>
            <Link href="#v4a-scene" onClick={() => setIsOpen(false)}>
              Hablemos de lo que necesitas resolver
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
