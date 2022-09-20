import { createClient } from 'contentful';
import Image from 'next/image';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

const client = createClient({
  space:process.env.CONTENTFUL_SPACE_ID,
  accessToken:process.env.CONTENTFUL_ACCESS_TOKEN
})

export default function RecipeDetails({recipe}) {
  console.log("recipe--",recipe)
  const {title, cookingTime,featuredImage,ingredients,method} = recipe[0].fields;
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <span>It will take {cookingTime}</span>
        <Image src={"https:"+featuredImage.fields.file.url} width={200} height={200} />
        <div>
          {ingredients.map(ing=>(
            <span key={ing}>{ing}</span>
          ))}
        </div>
        <div>
          {documentToReactComponents(method)}
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths(){
  const response = await client.getEntries({content_type:'recipe'});
  let paths = [] ;
  response.items?.forEach(item=>{
    paths.push({params:{slug:item.fields.slug}})
  })
  return{
    paths,
    fallback:false
  }
}

export async function getStaticProps(params){
  const response = await client.getEntries({content_type:'recipe','fields.slug':params.params.slug});
  return{
    props:{recipe:response.items}
  }
}