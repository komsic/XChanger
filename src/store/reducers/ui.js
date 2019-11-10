import { UI_MODAL_TOGGLE } from '../actionTypes';

export const applyToggleModal = (state) => ({
  ...state,
  modalStatus: state.modalStatus ? '' : 'is-close',
});


export const INITIAL_STATE = {
  modalStatus: 'is-close',
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UI_MODAL_TOGGLE: return applyToggleModal(state, action);
    default: return state;
  }
};

export default uiReducer;
