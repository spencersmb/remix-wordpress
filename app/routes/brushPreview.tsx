
import Layout from '@App/components/layoutTemplates/layout'
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PatternDz from '@App/components/patternPlayground/backgroundDz';
import UsePatternProvider from '@App/components/patternPlayground/usePatternProvider/patternProvider';
import { patternPlaygroundInitialState } from '@App/components/patternPlayground/usePatternProvider';
import PatternNav from '@App/components/patternPlayground/patternTypsNav';
import { mdxPageMetaV2 } from '@App/utils/seo';

export let meta = mdxPageMetaV2

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  // let searchData = {}
  // searchData = await getBrush(url.origin, 'E-T_Custom_Flat_Marker.brush');
  return json({
    brush: {}
  });
}

export default function BrushPreview() {
  let data = useLoaderData()

  /**
   * @function drawImageBasedOnPattern()
   * 
   * The function starts by checking if either image or canvasRef.current is null.If either one is 
   * null, the function returns without doing anything.
   * 
   * Then, it declares a variable canvas and sets it equal to canvasRef.current.It also declares a
   * variable ctx and sets it equal to the 2D rendering context of the canvas obtained from canvas
   * getContext("2d").The function returns if ctx is null.
   * 
   * Next, the function declares three variables image1Url, image2Url, and image3Url to store the
   * URLs of the images drawn on the canvas.
   * 
   * It also declares a variable aspectRatio and sets it equal to the aspect ratio of the imag
   * (height divided by width).
   * 
   * The function then starts processing three different patterns for drawing the image on the
   * canvas.For each pattern, it first calls the setCanvasSize function with the pattern number and
   * the canvas as arguments.Then, it calls the drawImage function with ctx, image, the pattern
   * number, and aspectRatio as arguments.Finally, it stores the data URL of the canvas in the
   * corresponding variable(image1Url, image2Url, or image3Url).After each pattern is processed,
   * the function clears the canvas by calling ctx.clearRect(0, 0, canvas.width, canvas.height)
   * 
   * Finally, the function sets the imageCache object with the URLs of the three images stored in
   * image1Url, image2Url, and image3Url.
   * 
   * Note that this function is declared as a useCallback hook, with an empty array of dependencies
   * This means that it will only be re - created when the dependencies change, otherwise it will
   * use the cached version.
   * 
   */

  return (
    <Layout >
      <>
        <UsePatternProvider defaultState={patternPlaygroundInitialState} >
          <>
            <PatternDz />
            <PatternNav />
          </>
        </UsePatternProvider>
      </>

    </Layout>
  )
}











