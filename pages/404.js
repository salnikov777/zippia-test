import Link from "next/link";

export default function ErrorPage() {
  return (
    <>
      <h1>Error 404</h1>
      <p>
        Please <Link href={"/test"}>go back to </Link> test page
      </p>
    </>
  );
}
