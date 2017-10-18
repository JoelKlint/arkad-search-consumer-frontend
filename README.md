# Front end for consuming Arkad-Search data

## How to mount

1. Build static assets
```js 
npm install && npm run build
```

2. Upload build products to a static address

3. Load frontend in desired website

Place this in html head
```html
<link rel="stylesheet" type="text/css" href="PLACE_URL_TO_CSS_HERE">
```

Place this in the bottom of html body
```html
<script src="PLACE_URL_TO_JS_HERE" mountNode="<id-of-dom-node-to-mount-on>" />
```

mountNode defaults to `arkad-search-consumer-frontend`