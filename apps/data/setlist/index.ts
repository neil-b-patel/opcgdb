import type { OPSetList } from '@opcgdb/types';

import en from './en.js';
import jp from './jp.js';

const db: OPSetList = [...en, ...jp];

export default db;
