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
