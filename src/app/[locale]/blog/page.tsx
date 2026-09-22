import type { Metadata } from "next";
import LocaleLink from "@/shared/ui/LocaleLink";
import { blogPosts } from "@/entities/blog/posts";
import { siteConfig, alternateUrls, canonicalUrl } from "@/configs/site.config";
import { ogLocale, type Locale } from "@/configs/locale.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "House Building Guides & Cost Tips in Nepal | CivoraX Blog";
  const description =
    "Practical guides for Nepali homeowners: choosing builders, plot-wise house plans, 2026 designs, construction costs, small-home interiors and material prices.";
  const path = "/blog";
  const canonical = canonicalUrl(locale as Locale, path);
  return {
    title,
    description,
    alternates: { canonical, languages: alternateUrls(path) },
    openGraph: {
      title: `${title} | CivoraX Infra`,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale as Locale] ?? "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#006c4e]">CivoraX Blog</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
        House building guides for Nepal
      </h1>
      <p className="mt-4 max-w-2xl text-[#4b5563]">
        Practical answers on builders, plot sizes, designs, costs and interiors — written for
        homeowners in Itahari, Dharan, Damak, Biratnagar and Birtamode.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-[#e8f5f0] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#006c4e]">
              {post.category}
            </p>
            <h2 className="mt-2 text-xl font-bold">
              <LocaleLink href={`/blog/${post.slug}`} className="hover:text-[#006c4e]">
                {post.title}
              </LocaleLink>
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#4b5563]">{post.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.keywords.slice(0, 3).map((k) => (
                <span key={k} className="rounded-full bg-[#f0faf5] px-3 py-1 text-xs text-[#006c4e]">
                  {k}
                </span>
              ))}
            </div>
            <LocaleLink
              href={`/blog/${post.slug}`}
              className="mt-5 inline-block text-sm font-bold text-[#006c4e]"
            >
              Read guide →
            </LocaleLink>
          </article>
        ))}
      </div>
    </main>
  );
}
