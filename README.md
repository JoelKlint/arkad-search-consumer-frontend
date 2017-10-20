# Front end for consuming Arkad-Search data

## How to mount

1. Build static assets
```js 
npm install && npm run build
```

2. Upload build/static folder to a static address

3. Load frontend in desired website

Place this in html head
```html
<link rel="stylesheet" type="text/css" href="PLACE_URL_TO_CSS_HERE">
```

Place this in the bottom of html body
```html
<script 
    src="PLACE_URL_TO_JS_HERE" 
    mountNode="<id-of-dom-node-to-mount-on>"
    NoHitsText="<text-to-show-when-no-hits-are-found>" 
    NoQueryText="<text-to-show-when-no-query>"
    SearchingText="<text-to-show-when-searching>"
/>
```
## Default values
mountNode: `arkad-search-consumer-frontend` \
NoHitsText: `No results found, try something else` \
NoQueryText: `Welcome to Arkad Search! What are you looking for?` \
SearchingText: `Searching...` 