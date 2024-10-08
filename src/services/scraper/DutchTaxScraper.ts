import * as cheerio from 'cheerio'
import { TaxResult } from '../../models/DutchTaxData'

const url = 'https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/overige_belastingen/belastingen_op_milieugrondslag/tarieven_milieubelastingen/tabellen_tarieven_milieubelastingen';

export async function scrapeData(): Promise<TaxResult[]> {
    try {
        // Fetch the HTML content
        const response = await fetch(url);
        const data = await response.text();
        const $ = cheerio.load(data);

        // Locate the article with ID hoofd_content
        const article = $('#hoofd_content');
        const subContent = article.find('#bldSubContent1');

        let results: TaxResult[] = [];

        // Iterate over each h2 element and its corresponding table
        subContent.find('h2').each((_index, element) => {
            const title = $(element).text().trim().replace(/\s+/g, ' '); // Sanitize title
            let table = $(element).next('table');
            
            // Handle dynamic IDs for scroll elements
            if (table.length === 0) {
                let scrollId = 1;
                while (table.length === 0) {
                    table = $(element).next(`#scroll${scrollId}`).next(`#scroll${scrollId}--table`).find('table');
                    scrollId++;
                }
            }

            let headers: string[] = [];
            let rows: { [key: string]: { title: string; price: number }[] } = {};

            // Extract table headers
            table.find('tbody tr').first().find('th').each((_i, th) => {
                headers.push($(th).text().trim());
            });

            // Extract table rows
            table.find('tbody tr').slice(1).each((_i, tr) => {
                const year = $(tr).find('th').first().text().trim().replace(/\D/g, ''); // Remove non-numeric characters
                $(tr).find('td').each((j, td) => {
                    const title = headers[j + 1];
                    const price = parseFloat($(td).text().trim().replace('€', '').replace(',', '.'));
                    if (!rows[year]) {
                        rows[year] = [];
                    }
                    rows[year].push({ title, price });
                });
            });

            results.push({
                title: title,
                data: rows
            });
        });

        return results;
    } catch (error) {
        console.error('Error scraping data:', error);
        return [];
    }
}