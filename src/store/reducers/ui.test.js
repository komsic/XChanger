import uiReducer from './ui';
import { UI_MODAL_TOGGLE } from '../actionTypes';

describe('ui reducer', () => {
  it('should toggle the modal state', () => {
    const newState = uiReducer({
      modalStatus: 'is-close',
    }, { type: UI_MODAL_TOGGLE });


    expect(newState.modalStatus).toEqual('');
  });

  it('should toggle the modal state', () => {
    const newState = uiReducer({
      modalStatus: '',
    }, { type: UI_MODAL_TOGGLE });


    expect(newState.modalStatus).toEqual('is-close');
  });
});
