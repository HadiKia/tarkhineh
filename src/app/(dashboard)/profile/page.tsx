import Link from "next/link";

const Profile = () => {
  return (
    <div className=" flex">
      <Link
        href="/panel"
        className="mb-6 inline-flex items-center gap-2 text-primary"
      >
        <span>بازگشت</span>
      </Link>
      <span>Profile</span>
    </div>
  );
};

export default Profile;
