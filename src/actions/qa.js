export const SETQAMODAL = 'SETQAMODAL';

export function setQAModal(qaModal) {
  return {
    type: SETQAMODAL,
    qaModal: qaModal
  };
}
