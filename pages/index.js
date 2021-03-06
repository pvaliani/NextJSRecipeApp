import Head from 'next/head'
import Link from "next/link"
import Image from "next/image"


import { sanityClient, urlFor } from '../lib/sanity'

// GROQ Query for recipes
const recipesQuery = `*[_type == "recipe"]{
  _id,
  name,
  slug,
  mainImage
}`;

export default function Home({ recipes }) {

  return (
    <div>
      <Head>
        <title>Your Kitchen</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome to Your Kitchen</h1>

      {/* If there are recipes, continue to map */}
      <ul className="recipes-list">
        {recipes?.length > 0 &&
          recipes.map((recipe) => (
            <li key={recipe._id} className="recipe-card">
              <Link href={`/recipes/${recipe.slug.current}`}>
                <a>
                  <img src={urlFor(recipe.mainImage).url()} alt={recipe.name} />
                  <span>{recipe.name}</span>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}



// This runs when you build and deploy your Next site. The function receives different parameters and returns what becomes our pages props
// The data returned will be saved to a static JSON file
// Need to return something that can be turned into JSON

// The reason why do the async await is that nextJS will pre-render this page at build time using the props returned by getStaticProps
export async function getStaticProps() {

  // we use a fetch here - useEffect would be normally used on the client side but we are performing server side rendering

  // we are just returning props as recipes once we fetch
  // these are returned to our function (Home) in this case
  const recipes = await sanityClient.fetch(recipesQuery)
  return { props: { recipes } };

}
