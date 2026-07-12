import { AdminPageHeader } from "@/components/admin/page-header";
import { SettingsForm } from "@/components/admin/settings-form";
import { updateSiteSettings } from "@/app/admin/actions/settings";
import { getSiteSettings } from "@/lib/repo/settings";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <AdminPageHeader
        title="Sayt Tənzimləmələri"
        description="Ana səhifə (Hero), Haqqımızda və Keyfiyyət & Təhlükəsizlik bölmələrinin məzmunu"
      />
      <SettingsForm settings={settings} action={updateSiteSettings} />
    </div>
  );
}
