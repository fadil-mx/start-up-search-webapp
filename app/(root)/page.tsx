import { create } from "domain";
import Searchbar from "../../components/Search";
import Cards from "@/components/Cards";
import { client } from "@/sanity/lib/client";
import { startups_query } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams; 
  const params = { search: query || null };
    // console.log(params);
  

  // const posts=[{
  //   _createdAt:Date.now(),
  //   views:"65",
  //   author:{_id:5,name:"max"},
  //   _id:5,
  //   description:"asdasddfiasfhlhovyao",
  //   image:"https://imgs.search.brave.com/LnKgdImhOUagSSmWCOOnQkSaJbThfodK_XWJVcfEQSU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY1Lzcw/LzM2MF9GXzU3MDY1/NzAzM185b0JsWVBn/YWVQQmdSc0xzSndD/cHA1eGZpTmNVZjBs/Yy5qcGc",
  //   category:"sdass",
  //   title:"dadasd"
  // },{
  //   _createdAt:Date.now(),
  //   views:"65",
  //   author:{_id:5,name:"max"},
  //   _id:5,
  //   description:"asdasddfsfasd",
  //   image:"https://imgs.search.brave.com/LnKgdImhOUagSSmWCOOnQkSaJbThfodK_XWJVcfEQSU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY1Lzcw/LzM2MF9GXzU3MDY1/NzAzM185b0JsWVBn/YWVQQmdSc0xzSndD/cHA1eGZpTmNVZjBs/Yy5qcGc",
  //   category:"sass",
  //   title:"dadasd"
  // }]

  // const posts = await client.fetch(startups_query);
  const {data:posts}=await sanityFetch({ query:startups_query,  params})
  //  console.log(posts);  

  const session= await auth()
  // console.log(session?.id);
  

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <Searchbar query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "Search for startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => (
    
              <Cards  key={post?._id} post={post}/>
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
