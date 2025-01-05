type PostType = {
  title: string;
  content: string;
  image: string;
};

export default async function Account() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about`, {
    cache: "no-store",
  });
  const aboutData = await response.json();

  return (
    <div>
      {aboutData?.map((item: PostType, index: number) => (
        <li key={index} className="border p-4 rounded-md shadow-md">{item.title}
          <h2 className="text-xl font-semibold mb-2">{item.content}</h2>
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="h-20 w-20 object-cover rounded-md"
            />
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
          <p className="mt-2 text-gray-700">{item.content}</p>
        </li>
      ))}
    </div>
  );
}
