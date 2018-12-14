import { UniquePipe } from './unique-pipe.pipe';

describe('UniquePipePipe', () => {
  it('create an instance', () => {
    const pipe = new UniquePipe();
    expect(pipe).toBeTruthy();
  });
});
