// this is the dynamic route in next via slugs - it will just replace the slug rather having to map a route manually

import { sanityClient, urlFor, usePreviewSubscription, PortableText } from "../../lib/sanity"

// This is where the GROQ query will be 
const recipeQuery = `*[type == "recipe" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    mainImage{
        asset->{
            _id,
            url
        }
    },
    ingredient[]{
        unit,
        wholeNumber,
        fraction,
        ingredient->{
            name
        }
    },
    instructions
};`

// for the template
export default function OneRecipe() {

}

// next to define a list of paths that could be clicked for the dynamic slug path. Will pre-render them for the user
export async function getStaticPaths() {
    // we want to fetch all slugs that could be potential paths
    const paths = await sanityClient.fetch(
        `*[_type == "recipe" && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }`
    )

    // if fallback is true it wont result in a 404 if the page doesn't exist. It will fall back to the first page on the path
    return {
        paths,
        fallback: true
    }

}

// we need the correct slug here to pull the correct content
export async function getStaticProps({ params }) {

    const { slug } = params;
    const recipe = await sanityClient.fetch(recipeQuery, { slug });
    return {
        props: { data: { recipe } }
    }

}

// 