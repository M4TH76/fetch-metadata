# fetch-metadata
Pure Javascript code to fetch and parse metadata
```
export const fetchMetadata = async (url) => {
    const html = await (await fetch(url, {
        timeout: 5000,
        headers: {
            'User-Agent': 'request'
    }
    })).text()
	
    var metadata = {};
    html.replace(/<meta.+(property|name)="(.*?)".+content="(.*?)".*\/>/igm, (m,p0, p1, p2)=>{ metadata[p1] = decode(p2) } );
    return metadata
}

export const decode = (str) => str.replace(/&#(\d+);/g, function(match, dec) {
	return String.fromCharCode(dec);
})
```

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
Return example: (/api/metadata?url=https://github.com)

```
{
    "apple-itunes-app": "app-id=1477376905",
    "twitter:description": "GitHub is where over 73 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and feat...",
    "og:description": "GitHub is where over 73 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and feat...",
    "visitor-hmac": "56760e48a73e4472cc2fb4df2549d99fe36c87654c079bca3f86fad4714694d8",
    "github-keyboard-shortcuts": "dashboards",
    "octolytics-url": "https://collector.githubapp.com/github/collect",
    "features-datafile": "{&quot;features&quot;:[{&quot;name&quot;:&quot;home_page_globe&quot;,&quot;enabled&quot;:true,&quot;percentageOfActors&quot;:0,&quot;actors&quot;:[]}]}"
}
```
