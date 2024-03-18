import { CheerioAPI } from 'cheerio';

import { OPTCGCardList } from '../types.js';

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

const getSeriesData = ($series: CheerioAPI): OPTCGCardList => {
  const $cards = $series('.resultCol > a');
  return $cards
    .map((_, card) => {
      const $res = $series(card);
      const id = $res.attr('data-src') || '';

      const $card = $series(id);
      const cardHead = $card.find('.infoCol').text().split('|');
      const number = cardHead[0].trim();

      const _set = $card.find('.getInfo').first().text().replace('Card Set(s)', '').trim();
      const set = getSetNameAndID(_set);

      const rarity = cardHead[1].replace('CARD', '').trim();

      const color = $card.find('.color').text().replace('Color', '').split('/');

      const type = $card.find('.feature').text().replace('Type', '').split('/');

      const category = cardHead[2].trim();

      const cost = $card.find('.cost').text().replace('Cost', '');
      const life = $card.find('.cost').text().replace('Life', '');

      const name = $card.find('.cardName').text();

      // Optional properties
      const _attribute = $card.find('.attribute').text().replace('Attribute', '').trim();
      const attribute = _attribute === '-' ? undefined : _attribute;

      const _power = $card.find('.power').text().replace('Power', '');
      const power = _power === '-' ? undefined : _power;

      const _counter = $card.find('.counter').text().replace('Counter', '');
      const counter = _counter === '-' ? undefined : _counter;

      const _effect = $card.find('.text').text().replace('Effect', '');
      const effect = _effect === '-' ? undefined : _effect;

      const $trigger = $card.find('.trigger');
      const _trigger = $trigger?.text().replace('Trigger', '').trim() || '';
      const trigger = _trigger === '' ? undefined : _trigger;

      return {
        id: id.replace('#', ''),
        number,
        set,
        rarity,
        color,
        type,
        category,
        name,
        cost: rarity !== 'L' ? cost : undefined,
        life: rarity === 'L' ? life : undefined,
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
