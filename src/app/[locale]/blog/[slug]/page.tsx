import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocaleLink from "@/shared/ui/LocaleLink";
import { blogPosts, getBlogPost } from "@/entities/blog/posts";
import { siteConfig, alternateUrls, canonicalUrl } from "@/configs/site.config";
import { ogLocale, type Locale } from "@/configs/locale.config";
import { consultationLink } from "@/entities/navigation";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const path = `/blog/${slug}`;
  const canonical = canonicalUrl(locale as Locale, path);
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical, languages: alternateUrls(path) },
    openGraph: {
      title: `${post.title} | CivoraX Infra`,
      description: post.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale as Locale] ?? "en_US",
      type: "article",
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = post.related
    .map((s) => getBlogPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const canonical = `${siteConfig.url}/en/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: canonical,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/en` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/en/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <main className="mx-auto max-w-[820px] px-5 py-16 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <LocaleLink href="/blog" className="text-sm font-bold text-[#006c4e]">
        ← All guides
      </LocaleLink>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-[#006c4e]">
        {post.category}
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{post.title}</h1>
      <p className="mt-4 text-lg leading-8 text-[#4b5563]">{post.description}</p>
      <p className="mt-3 text-xs text-[#9ca3af]">
        Published {post.date} · Updated {post.updated}
      </p>

      {post.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-2xl font-bold">{section.heading}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="mt-3 leading-7 text-[#374151]">
              {p}
            </p>
          ))}
          {section.bullets && (
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[#374151]">
              {section.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className="mt-12 rounded-2xl bg-[#f0faf5] p-6">
        <h2 className="text-xl font-bold">Related services</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <LocaleLink href="/services" className="font-semibold text-[#006c4e]">
              House construction, 3D design & interior services →
            </LocaleLink>
          </li>
          <li>
            <LocaleLink href="/our-work" className="font-semibold text-[#006c4e]">
              Modern house designs & architecture portfolio →
            </LocaleLink>
          </li>
          <li>
            <LocaleLink href="/process" className="font-semibold text-[#006c4e]">
              Building process & cost estimator →
            </LocaleLink>
          </li>
        </ul>
        <LocaleLink
          href={consultationLink}
          className="mt-5 inline-flex h-[48px] items-center rounded-full bg-[#20b486] px-6 text-sm font-bold text-[#003f2c]"
        >
          Contact us for a free estimate
        </LocaleLink>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Frequently asked questions</h2>
        <div className="mt-4 space-y-4">
          {post.faqs.map((f) => (
            <div key={f.question} className="rounded-xl border border-[#e8f5f0] p-4">
              <h3 className="font-bold">{f.question}</h3>
              <p className="mt-2 text-sm leading-6 text-[#4b5563]">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-10 border-t border-[#e8f5f0] pt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[#9ca3af]">Filed under</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {post.keywords.map((k) => (
            <span key={k} className="rounded-full bg-[#f0faf5] px-3 py-1 text-xs text-[#006c4e]">
              {k}
            </span>
          ))}
        </div>
      </footer>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">You might also like</h2>
          <div className="mt-4 grid gap-4">
            {related.map((r) => (
              <LocaleLink
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="rounded-xl border border-[#e8f5f0] p-4 font-semibold hover:text-[#006c4e]"
              >
                {r.title}
              </LocaleLink>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
