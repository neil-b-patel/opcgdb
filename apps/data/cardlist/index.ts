import { OPCardList } from '@opcgdb/types';

import en from './en/list.js';
import jp from './jp/list.js';

const db: OPCardList = [...en, ...jp];

export default db;
