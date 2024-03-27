import { CheerioAPI } from 'cheerio';

import { OPCard, OPCardColor, OPCardList, OPLang } from '@opcgdb/types';

// TODO: Standardise color and attribute for japanese entries
const jpColorMap: Record<string, OPCardColor> = {
  赤: 'Red',
  青: 'Blue',
  黄: 'Yellow',
  緑: 'Green',
  黒: 'Black',
  紫: 'Purple',
};

const attributeMap: Record<string, string> = {
  '/images/cardlist/attribute/ico_type03.png': 'Special',
  '/images/cardlist/attribute/ico_type05.png': 'Wisdom',
  '/images/cardlist/attribute/ico_type02.png': 'Slash',
  '/images/cardlist/attribute/ico_type01.png': 'Strike',
  '/images/cardlist/attribute/ico_type04.png': 'Ranged',
};

const getSetNameAndID = (input: string) => {
  // Exception for JP - ST13 doesn't include set ID, only name
  if (input.includes('The Three Brothers')) {
    return 'ST13';
  }

  // Exception for EN - some cards with different format in set
  if (input.startsWith('OP')) {
    return input.replace('-', '').trim();
  }
  const parts = input.split('[');
  const id = parts[1] ? parts[1].replace(/-/g, '').replace(/]/g, '').trim() : 'PROMO';
  return id;
};

const getSeriesData = ($series: CheerioAPI, lang: OPLang): OPCardList => {
  const $cards = $series('.resultCol > a');
  return $cards
    .map((_, card): OPCard => {
      const $res = $series(card);
      const id = $res.attr('data-src') || '';

      const $card = $series(id);
      const cardHead = $card.find('.infoCol').text().split('|');
      const number = cardHead[0].trim();

      const _set = $card
        .find('.getInfo')
        .first()
        .text()
        .replace('Card Set(s)', '')
        .replace('入手情報', '')
        .trim();
      const set = getSetNameAndID(_set);

      const rarity = cardHead[1].replace('CARD', '').trim();

      const color = $card.find('.color').text().replace('Color', '').replace('色', '').split('/');

      const type = $card.find('.feature').text().replace('Type', '').replace('特徴', '').split('/');
      const searchType = $card
        .find('.feature')
        .text()
        .replace('Type', '')
        .replace('特徴', '')
        .toLowerCase()
        .split('/');

      const category = cardHead[2].trim();

      const cost = $card.find('.cost').text().match(/\d+$/);
      const life = $card.find('.cost').text().match(/\d+$/);

      const name = $card.find('.cardName').text();

      // Optional properties
      const _attribute = $card.find('.attribute img').attr('src');
      const attribute = _attribute ? attributeMap[_attribute] : undefined;

      const _power = $card.find('.power').text().match(/\d+$/);
      const power = _power === null || !_power[0] ? undefined : parseInt(_power[0], 10);

      const _counter = $card.find('.counter').text().match(/\d+$/); // JP-OP01-016_p5 correction
      const counter = _counter === null || !_counter[0] ? undefined : parseInt(_counter[0], 10);

      const _effect = $card.find('.text').text().replace('Effect', '').replace('テキスト', '');
      const effect = _effect === '-' ? undefined : _effect;

      const $trigger = $card.find('.trigger');
      const _trigger = $trigger?.text().replace('Trigger', '').replace('トリガー', '').trim() || '';
      const trigger = _trigger === '' ? undefined : _trigger;

      return {
        id: id.replace('#', ''),
        lang,
        number,
        set,
        rarity,
        color: lang === 'jp' ? color.map((c) => jpColorMap[c]) : color,
        type,
        searchType,
        category,
        name,
        searchName: name.toLowerCase(),
        cost: rarity !== 'L' && cost ? parseInt(cost[0], 10) || 0 : undefined,
        life: rarity === 'L' && life ? parseInt(life![0], 10) : undefined,
        attribute,
        power,
        counter,
        effect,
        trigger,
      };
    })
    .toArray();
};

export default getSeriesData;
