import Link from "next/link";

const AdminPage = () => {
  return (
    <div className=" flex">
      <Link
        href="/panel"
        className="mb-6 inline-flex items-center gap-2 text-primary"
      >
        <span>بازگشت</span>
      </Link>
      <span>AdminPage</span>
    </div>
  );
};

export default AdminPage;
