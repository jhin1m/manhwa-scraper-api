# Adult Manhwa/Manga Scrapper API

Manhwa/Manga Scrapper from hiperdex.com based on cheerio and node.js

## Test Url

manhwa-api.vercel.app/api/

## Installing

    npm install
    node api
    
## Endpoints

Latest Chapters at: `/api/latest/:page` (example: `/api/latest/1`) 

All Manhwa List at: `/api/all/:page` (example: `/api/all/1`)

Manhwa Info + Chapters at: `/api/info/:slug` (example: `/api/info/secret-class`) 

Manhwa Images List at: `/api/chapter/:manga/:chapter` (example: `/api/chapter/nano-machine/chapter-68/`)

## Note

Works well on vercel, added caching on the chapter pages. I hate ads on this page so, I made this simple api. A simple manga reader based on this api with no ads is also on my rep so check it out as well.
