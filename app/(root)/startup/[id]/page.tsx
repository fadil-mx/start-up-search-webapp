import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { startup_query_id } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import markdownit from "markdown-it";
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

// export const experimental_ppr = true;
const md = markdownit();

const page = async ({params}:{params: promise<{id:string}>}) => {
    const {id} =(await  params)
    // console.log(id);
    
    const posts=await client.fetch(startup_query_id,{id})
    // console.log(posts);
    // console.log(posts[0].description);
    if(!posts) return notFound()
      
 

  const parsedContent = md.render(posts[0]?.pitch || "");

  return (
<>
<section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(posts[0]?._createdAt)}</p>

        <h1 className="heading">{posts[0].title}</h1>
        <p className="sub-heading !max-w-5xl">{posts[0].description}</p>
      </section>
      <section className="section_container">
      <img
          src={posts[0].image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${posts[0].author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={posts[0].author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{posts[0].author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{posts[0].author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{posts[0].category}</p>
          </div>
          
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all "
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
        </section>

</>
  )
}

export default page
