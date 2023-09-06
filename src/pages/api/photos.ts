import type { APIRoute } from 'astro'
import { photo_store, store } from "../../store";

export const GET: APIRoute = ({ params }) => {
  console.log('what are these?')
  const photos = store.get(params.id)
  // return new Response({ text: 'hello' });
  //


  return new Response(photos.paths[0])
}
