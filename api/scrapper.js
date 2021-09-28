const cheerio = require('cheerio');
const axios = require('axios');

async function info(slug) {
    let genres = []

    try{
        res = await axios.get(`https://hiperdex.com/manga/${slug}`)
        const body = await res.data;
        const $ = cheerio.load(body)

        let manhwa_title = $('.post-title > h1:nth-child(1)').text().trim()
        let poster = $('.summary_image img').attr('src')
        let author = $('.author-content a').text().trim()
        let artist = $('.artist-content a').text().trim()

        let genres_e = $('.genres-content a')
        
        $(genres_e).each((i,e)=>{
            genres.push($(e).text().trim())
        })

        let other_name = $('div.post-content_item:nth-child(5) > div:nth-child(2)').text().trim()
        
        let status = $('div.post-content_item:nth-child(2) > div:nth-child(2)').text().trim()
        
        let description = $('.description-summary').text().trim()

        let ch_list = await chaptersList(`https://hiperdex.com/manga/${slug}/ajax/chapters/`)

         return await ({
            'page': manhwa_title,
            'other_name': other_name,
            'poster': poster,
            'authors': author,
            'artists': artist,
            'genres':genres,
            'status': status,
            'description': description,
            ch_list
        })
     } catch (error) {
        return await ({'error': 'Sorry dude, an error occured! No Info!'})
     }

}

async function chaptersList(url){
    let ch_list = []

    try{
        res = await axios.post(url)
        const body = await res.data;
        const $ = cheerio.load(body)

        $('.version-chap li').each((index, element) => {

                $elements = $(element)
                title = $elements.find('a').text().trim()
                url = $elements.find('a').attr('href')
                time = $elements.find('.chapter-release-date').find('i').text()
                status = $elements.find('.chapter-release-date').find('a').attr('title')

                chapters = {'ch_title': title, 'time': time, 'status': status, 'url': url}

                ch_list.push(chapters)     
        })

        return await (ch_list)
    } catch(error) {
        return await ('Error Getting Chapters!')
    }
}

async function all(page) {

    let m_list = []

    try{
        res = await axios.get(`https://hiperdex.com/manga-list/page/${page}`)
        const body = await res.data;
        const $ = cheerio.load(body)

        let p_title = $('.c-blog__heading h1').text().trim()

        $('#loop-content .badge-pos-1').each((index, element) => {

                $elements = $(element)
                image = $elements.find('.page-item-detail').find('img').attr('src')
                url = $elements.find('.page-item-detail').find('a').attr('href')
                title = $elements.find('.page-item-detail .post-title').find('h3').text().trim()
                rating = $elements.find('.total_votes').text().trim()

                chapter = $elements.find('.list-chapter .chapter-item')

                let chapters = []
                
                $(chapter).each((i,e)=>{

                    let c_title = $(e).find('a').text().trim()
                    let c_url = $(e).find('a').attr('href')
                    let c_date = $(e).find('.post-on').text().trim()
                    let status = $(e).find('.post-on a').attr('title')

                    chapters.push({
                        'c_title': c_title,
                        'c_url': c_url,
                        'c_date': c_date,
                        'status': status
                    })
                })

                m_list.push({
                    'title': title,
                    'rating': rating,
                    'image': image,
                    'url': url,
                    'chapters': chapters
                })     
        })

        let current = $('.current').text()
        
        let last_page = $('.last').attr('href')
        !last_page?last_page=current:last_page

         return await ({
            'p_title': p_title,
            'list': m_list,
            'current_page': parseInt(current),
            'last_page': parseInt(last_page.replace(/[^0-9]/g, ''))
        })
    } catch (error) {
        return await ({'error': 'Sorry dude, an error occured! No Latest!'})
     }

}

async function latest(page) {

    let m_list = []

    try{
        res = await axios.get(`https://hiperdex.com/page/${page}`)
        const body = await res.data;
        const $ = cheerio.load(body)

        let p_title = $('.c-blog__heading h1').text().trim()

        $('#loop-content .badge-pos-1').each((index, element) => {

                $elements = $(element)
                image = $elements.find('.page-item-detail').find('img').attr('src')
                url = $elements.find('.page-item-detail').find('a').attr('href')
                title = $elements.find('.page-item-detail .post-title').find('h3').text().trim()
                rating = $elements.find('.total_votes').text().trim()

                chapter = $elements.find('.list-chapter .chapter-item')

                let chapters = []
                
                $(chapter).each((i,e)=>{

                    let c_title = $(e).find('a').text().trim()
                    let c_url = $(e).find('a').attr('href')
                    let c_date = $(e).find('.post-on').text().trim()
                    let status = $(e).find('.post-on a').attr('title')

                    chapters.push({
                        'c_title': c_title,
                        'c_url': c_url,
                        'c_date': c_date,
                        'status': status
                    })
                })

                m_list.push({
                    'title': title,
                    'rating': rating,
                    'image': image,
                    'url': url,
                    'chapters': chapters
                })     
        })

        let current = $('.current').text()
        
        let last_page = $('.last').attr('href')
        !last_page?last_page=current:last_page

         return await ({
            'p_title': p_title,
            'list': m_list,
            'current_page': parseInt(current),
            'last_page': parseInt(last_page.replace(/[^0-9]/g, ''))
        })
    } catch (error) {
        return await ({'error': 'Sorry dude, an error occured! No Latest!'})
     }

}


async function chapter(manga,chapter) {

    let ch_list = []

    try{
        res = await axios.get(`https://hiperdex.com/manga/${manga}/${chapter}`)
        const body = await res.data;
        const $ = cheerio.load(body)

        $('.read-container img').each((index, element) => {

                $elements = $(element)
                image = $elements.attr('src').trim()

                ch_list.push({'ch': image})     
        })

        let manga_title = $('#chapter-heading').text().trim()
        let manga_url = $('.breadcrumb > li:nth-child(2) > a:nth-child(1)').attr('href')
        
        let current_ch = $('.active').text().trim()
        
        let prev = $('.prev_page').attr('href')
        let next = $('.next_page').attr('href')
        

        return await ({
            'manga': manga_title,
            'manga_url':manga_url,
            'current_ch': current_ch,
            'chapters': ch_list,
            'nav':[{
                'prev': prev,
                'next': next
            }]
        })
     } catch (error) {
        return await ({'error': 'Sorry dude, an error occured! No Chapter Images!'})
     }

}

module.exports = {
	latest,
    all,
    info,
    chapter
}