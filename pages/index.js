import { createClient } from 'contentful';
import  RecipeCard from '../components/RecipeCard';

export default function Recipes({recipes}) {
  console.log("response",recipes);
  console.log("revalidated incremental static generation")
  return (
    <div className="recipe-list">
      {recipes.map(recipe=>(
        <RecipeCard key={recipe.sys.id} recipe={recipe}/>
      ))}
      <style jsx>{`
        .recipe-list{
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps(){
  const client = createClient({
    space:process.env.CONTENTFUL_SPACE_ID,
    accessToken:process.env.CONTENTFUL_ACCESS_TOKEN
  })

  const response = await client.getEntries({content_type:'recipe'});

  return{
    props:{recipes:response.items},
    revalidate: 1
  }

}