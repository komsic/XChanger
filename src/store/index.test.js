import store from './index';

describe('redux store', () => {
  it('should ensure store was created', () => {
    expect(store).not.toBe(null);
  });
});
