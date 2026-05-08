import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen grid place-items-center bg-cream-50 pt-32 pb-20">
      <div className="container-narrow text-center">
        <div className="font-display text-9xl text-walnut-500/40">404</div>
        <h1 className="font-display text-4xl md:text-5xl text-forest-900 mt-4">
          Pagina nu a fost găsită.
        </h1>
        <p className="mt-5 font-serif text-lg text-stone-500">
          Probabil ai greșit drumul. Hai înapoi la noi.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Acasă</Link>
          <Link href="/apartments" className="btn-secondary">Apartamente</Link>
        </div>
      </div>
    </section>
  );
}
