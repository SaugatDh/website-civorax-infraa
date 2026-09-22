import { ArrowUpRight, Briefcase, GraduationCap, UserRound } from "lucide-react";
import { siteConfig } from "@/configs/site.config";

const portals = [
  {
    key: "client",
    label: "Client Portal",
    description: "Track your project status, milestones, documents, and payment history.",
    icon: UserRound,
    loginHref: `${siteConfig.appUrl}/client/login`,
    registerHref: `${siteConfig.appUrl}/client/register`,
  },
  {
    key: "student",
    label: "Student Portal",
    description: "View your enrolled courses, class schedules, and session links.",
    icon: GraduationCap,
    loginHref: `${siteConfig.appUrl}/student/login`,
    registerHref: `${siteConfig.appUrl}/student/register`,
  },
  {
    key: "team",
    label: "Team Portal",
    description: "Access your assigned tasks, projects, and internal tools.",
    icon: Briefcase,
    loginHref: `${siteConfig.appUrl}/team/login`,
    registerHref: null,
  },
] as const;

export default function PortalAccess() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="font-sora text-3xl font-bold tracking-[-0.04em] text-[#1c1c19]">
          Portal Access
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#6d7a72]">
          Sign in or register for the portal that matches your account type.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portals.map((portal) => {
          const Icon = portal.icon;
          return (
            <div
              key={portal.key}
              className="flex flex-col rounded-[24px] border border-white/60 bg-white p-7 shadow-[0_18px_60px_rgba(8,29,48,0.07)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#006c4e]/10 text-[#006c4e]">
                <Icon size={22} />
              </div>

              <h2 className="mt-5 font-sora text-xl font-bold text-[#1c1c19]">
                {portal.label}
              </h2>

              <p className="mt-2 flex-1 text-sm leading-6 text-[#6d7a72]">
                {portal.description}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={portal.loginHref}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#006c4e] px-5 text-sm font-bold text-white transition-colors hover:bg-[#00543c]"
                >
                  Log In
                  <ArrowUpRight size={16} />
                </a>
                {portal.registerHref ? (
                  <a
                    href={portal.registerHref}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#f0ede9] px-5 text-sm font-bold text-[#1c1c19] transition-colors hover:bg-[#e5e2dd]"
                  >
                    Create Account
                  </a>
                ) : (
                  <p className="text-center text-xs text-[#9ca3af]">
                    Accounts are created by an administrator.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
