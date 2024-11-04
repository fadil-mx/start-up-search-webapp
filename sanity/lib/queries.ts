import { defineQuery } from "next-sanity";

export const  startups_query = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
    _id, 
    title, 
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio
    }, 
    views,
    description,
    category,
    image,
  }`)

  export const  startup_query_id= defineQuery(`*[_type == "startup" && _id == $id] {
    _id, 
    title, 
    slug,
    _createdAt,
    author -> {
      _id, name,username, image, bio
    }, 
    views,
    description,
    category,
    image,
    pitch
  }`)


  export const STARTUP_VIEWS_QUERY = defineQuery(`
    *[_type == "startup" && _id == $id][0]{
        _id, view
    }
`);

export const AUTHOR_BY_GITHUB_ID = defineQuery(`*[_type == "author" &&    id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio,
      }`)