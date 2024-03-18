import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

async function getPageDOM(url: string): Promise<cheerio.CheerioAPI> {
  try {
    const response = await fetch(url);

    const html = await response.text();

    // Load the HTML content into cheerio
    return cheerio.load(html);
  } catch (error) {
    console.error('Error fetching webpage:', error);
    return cheerio.load('');
  }
}

export default getPageDOM;
