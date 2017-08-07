import Signal from '../dist/Signal.js';
import test from 'ava';





test('foo', t => {
  const signal = new Signal();
  return signal.version().then( (v) => {
     console.log(v);
     t.is(v.replace(/\s+/g, ' ').trim(), 'signal-cli 0.5.5');
   });

});

// test('bar', async t => {
// 	const bar = Promise.resolve('bar');
//
// 	t.is(await bar, 'bar');
// });