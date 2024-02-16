import { getRandomSet } from './util';
import { exampleData as data } from './static/data';

describe('Util', () => {
  describe('getRandomSet', () => {
    it('gets a set of defined length', () => {
      const count = 3;

      const result = getRandomSet(data, count);
      expect(result.length).toBe(count);
    });
  });
});
