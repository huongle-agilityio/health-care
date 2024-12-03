import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
}

export const revalidate = 3600;

const Page = async () => {
  const posts: Post[] = await fetch("https://api.vercel.app/blog").then((res) =>
    res.json()
  );

  return (
    <>
      <div className="w-full">dashboard</div>

      {posts.map((post) => (
        <Link key={post.id} href={`/dashboard/${post.id}/user`}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </Link>
      ))}
    </>
  );
};

export default Page;
