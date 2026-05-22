import AdminShell from "../_components/AdminShell";
import ChangePasswordForm from "./_components/ChangePasswordForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Réglages" };

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <div className="px-10 py-10 max-w-[560px]">
        <h1 className="font-serif text-[32px] text-[#f4f1ea] font-normal mb-1">Réglages</h1>
        <p className="font-mono text-[10.5px] tracking-[.2em] uppercase text-[#7a7770] mb-10">
          Sécurité &amp; configuration
        </p>

        <section>
          <h2 className="font-mono text-[11px] tracking-[.2em] uppercase text-[#a8a59d] mb-6 pb-3 border-b border-[#1f1d1a]">
            Changer le mot de passe
          </h2>
          <ChangePasswordForm />
        </section>
      </div>
    </AdminShell>
  );
}
