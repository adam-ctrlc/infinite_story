import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSettings from "@/components/profile/ProfileSettings";

export default function page() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020617]">
      <ProfileHeader />
      <ProfileSettings />
    </div>
  );
}
