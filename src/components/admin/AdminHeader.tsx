import { Bell, Search } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: Props) {
  return (
    <header className="sticky top-0 z-20 flex h-20 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 md:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Admin Portal
        </p>

        <h1 className="mt-1 text-xl font-black text-gray-950 md:text-2xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 hidden text-sm text-gray-500 md:block">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 md:flex">
          <Search size={18} />
        </button>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50">
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-black" />
        </button>

        <div className="hidden h-8 w-px bg-gray-200 md:block" />

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
            A
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-bold text-gray-900">Admin</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}