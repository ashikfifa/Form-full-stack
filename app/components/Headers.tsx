import Link from "next/link";

export default function Headers() {
  return (
    <nav className="  ">
      <ul className="flex items-center gap-5">
        <li>
          {" "}
          <Link href={"/"}> Home </Link>
        </li>
        <li>
          {" "}
          <Link href={"/about"}> About </Link>
        </li>
        <li>
          {" "}
          <Link href={"/blog"}> Blog </Link>
        </li>
        <li>
          {" "}
          <Link href={"/account"}> Account </Link>
        </li>
        <li>
          {" "}
          <Link href={"/login"}> Login </Link>
        </li>
      </ul>
    </nav>
  );
}
