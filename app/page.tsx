export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
  const posts = await res.json();

  return (
    <div>
      asdasd
      {posts?.title}
    </div>
  );
}
