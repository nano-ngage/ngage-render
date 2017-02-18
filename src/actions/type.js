export const PRESENTER = 'PRESENTER';
export const VIEWER = 'VIEWER';

export function setPresenter() {
  return {
    type: PRESENTER
  };
}

export function setViewer() {
  return {
    type: VIEWER
  };
}
