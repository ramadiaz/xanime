import Link from "next/link";

const Header = ({ title, linkHref, linkTitle }) => {
  return (
    <div className="flex justify-between items-center py-12 mx-auto w-11/12 lg:w-2/3">
      <h1 className="text-2xl text-slate-200 font-bold">{title}</h1>
      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          className="text-xl text-amber-300 hover:text-slate-200 transition-all"
        >
          {linkTitle}
        </Link>
      ) : null}
    </div>
  );
};
export default Header;
