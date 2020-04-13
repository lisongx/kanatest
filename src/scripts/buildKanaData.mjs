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
const kanaFilePath = path.resolve(__dirname, "..", 'kana.json');

class KanaBuilder {
    constructor(items) {
        this.items = items;
        this.yoonCombinators = this.buildYoonCombinatorsMap(items);
    }

    _buildYoonLookupKey = (typeLabel, romanji) => {
        return `${typeLabel}-${romanji}`;
    }

    getYoonCombinator = (typeLabel, romanji) => {
        const key = this._buildYoonLookupKey(typeLabel, romanji)
        return this.yoonCombinators.get(key);
    }

    buildYoonCombinatorsMap = (items) => {
        const m = new Map();

        items.filter(
            item => consts.YO_ON_COMBINATORS.includes(item['romanji'])
        ).forEach(item => {
            const key = this._buildYoonLookupKey(item.typeLabel, item.romanji);
            m.set(key, item);
        });

        return m;
    }

    _computeYoonRoanji = (baseRomanji, combinatorRomanji) => {
        if (baseRomanji === "ji") {
            // ja =  "j" + "ya"[1]
            return baseRomanji[0] + combinatorRomanji[1];
        } else if (baseRomanji.endsWith('hi') && baseRomanji.length === 3) {
            // sha = "shi" + "ya"[1]
            return baseRomanji.substring(0, 2) + combinatorRomanji[1];
        } else {
            // kya = "ki"[0] + "ya"
            return baseRomanji[0] + combinatorRomanji;
        }
    }

    buildYoonItem = (base, combinator) => {
        return {
            char: `${base.char}${combinator.smallChar}`,
            typeLabel: `${base.typeLabel}`,
            romanji: this._computeYoonRoanji(base.romanji, combinator.romanji),
            isYoon: true,
            base: base.kana,
            combinator: combinator.kana
        }
    }

    // Because all the variant of 拗音 is not in wikidata
    // We have to generate this based on the rule
    // https://en.wikipedia.org/wiki/Y%C5%8Don
    generateAllYoonItems = (items) => {
        return items.flatMap(base => {
            return consts.YO_ON_COMBINATORS.map(combinatorRomanji => {
                const combinator = this.getYoonCombinator(base.typeLabel, combinatorRomanji);
                return this.buildYoonItem(base, combinator);
            })
        })
    };

    generateFullKana = (items) => {
        // Remove things like 'vu','wi' that's not commonly used anymore
        const cleanItems = items.filter(
            item => !consts.IGNORE_KANA.includes(item.romanji) && !item.specialRomanjiCase
        )

        const yoonBaseItems = items.map(item => {
            if (consts.YO_ON_LIST.includes(item.romanji)) {
                return item;
            }

            return null;
        }).filter(Boolean);

        const yoonItems = this.generateAllYoonItems(yoonBaseItems);

        return [...cleanItems, ...yoonItems]
    };

    saveToFile = (data) => {
        try {
            fs.writeFileSync(kanaFilePath, JSON.stringify(data, null, 2))
        } catch (err) {
            console.error(err)
        };
    }

    build() {
        const fullItems = this.generateFullKana(this.items);
        this.saveToFile(fullItems)
    }
}


axios.get(url).then(
    response => {
        const items = client.simplify.sparqlResults(response.data);

        const builder = new KanaBuilder(items)
        builder.build();
    }
);
