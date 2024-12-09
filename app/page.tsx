type PostType = {
  title: string;
  content: string;
};

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
  const posts = await res.json();

  return (
    <div>
      {posts?.map((item: PostType, index: number) => (
        <li key={index}>{item?.title}</li>
      ))}
    </div>
  );
}
