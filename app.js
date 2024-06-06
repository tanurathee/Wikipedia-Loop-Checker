const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

async function getPage(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching page: ${url}`);
        throw error;
    }
}

async function getFirstLink(html) {
    const $ = cheerio.load(html);
    const content = $('#mw-content-text').first();
    const firstLink = content.find('p > a').first();
    return firstLink.attr('href');
}

async function countRequestsToPhilosophy(url, visitedPages = [], requestCount = 0) {
    const pageHtml = await getPage(url);
    const firstLink = await getFirstLink(pageHtml);

    if (!firstLink) {
        return { count: requestCount, visitedPages };
    }

    const nextPageUrl = `https://en.wikipedia.org${firstLink}`;
    visitedPages.push(nextPageUrl);

    if (firstLink === '/wiki/Philosophy') {
        return { count: requestCount + 1, visitedPages };
    }

    return countRequestsToPhilosophy(nextPageUrl, visitedPages, requestCount + 1);
}

app.get('/find-philosophy', async (req, res) => {
    const { url } = req.query;

    try {
        const { count, visitedPages } = await countRequestsToPhilosophy(url);
        res.json({ count, visitedPages });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
