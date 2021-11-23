# fetch-metadata
Pure Javascript code to fetch and parse metadata

I use this function to parse remote url's metadata from Next.js backend

Returns a JSON object with a list of meta tag (name|property) with the content Ex:

``` 
//   /pages/api/metadata.js
import {fetchMetadata} from "@/utils/metadata"

export default async function handler({ query, method }, res) {
	const {url} = query
	res.status(200).json(await fetchMetadata(url))
}

```
