// Script to query wikidata for all the kana raw data, processed and saved
// in json file

import wbk from "wikibase-sdk";
import axios from 'axios';
import fs from "fs";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import consts from './consts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = wbk({
    instance: 'https://www.wikidata.org',
    sparqlEndpoint: 'https://query.wikidata.org/sparql'
})

const scriptsDir = path.resolve(__dirname);
const sparql = fs.readFileSync(path.join(scriptsDir, "query.sparql"));
const url = client.sparqlQuery(sparql);

axios.get(url).then(
    response => {
        const items = client.simplify.sparqlResults(response.data).filter(
            item => !consts.IGNORE_KANA.includes(item['romanji'])
        );

        console.log('items', items, items.length);
    }
);
