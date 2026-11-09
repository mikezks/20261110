import { StatusColorPipe } from './status-color-pipe';

describe('StatusColorPipe', () => {
  it('distinguishes delayed and on-time flights', () => {
    const pipe = new StatusColorPipe();
    expect(pipe.transform(true)).toBe('#9e1b14');
    expect(pipe.transform(false)).toBe('#176133');
  });
});
