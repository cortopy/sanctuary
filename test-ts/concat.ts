import * as S from '..';

import eq from './internal/eq';


test('concat', () => {

  eq(typeof S.concat, 'function');
  eq(S.concat.length, 2);
  eq(S.concat.toString(), 'concat :: Semigroup a => a -> a -> a');

  eq(S.concat([])([]), []);
  eq(S.concat([1, 2, 3])([]), [1, 2, 3]);
  eq(S.concat<number>([])([4, 5, 6]), [4, 5, 6]);
  eq(S.concat([1, 2, 3])([4, 5, 6]), [1, 2, 3, 4, 5, 6]);

  eq(S.concat('')(''), '');
  eq(S.concat('foo')(''), 'foo');
  eq(S.concat('')('bar'), 'bar');
  eq(S.concat('foo')('bar'), 'foobar');

  eq(S.concat<S.Maybe<string>>(S.Nothing)(S.Nothing), S.Nothing);
  eq(S.concat(S.Just('foo'))(S.Nothing), S.Just('foo'));
  eq(S.concat(S.Nothing)(S.Just('bar')), S.Just('bar'));
  eq(S.concat(S.Just('foo'))(S.Just('bar')), S.Just('foobar'));

  eq(S.concat(S.Left('abc'))(S.Left('def')), S.Left('abcdef'));
  eq(S.concat(S.Right([1, 2, 3]))(S.Left('def')), S.Right([1, 2, 3]));
  eq(S.concat(S.Left('abc'))(S.Right([4, 5, 6])), S.Right([4, 5, 6]));
  eq(S.concat(S.Right([1, 2, 3]))(S.Right([4, 5, 6])), S.Right([1, 2, 3, 4, 5, 6]));

});
