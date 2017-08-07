import test from 'ava';
import Signal from '../dist/Signal';

test('foo', (t) => {
  const signal = new Signal();
  return signal.version().then((v) => {
    t.is(v.replace(/\s+/g, ' ').trim(), 'signal-cli 0.5.5');
  });
});
