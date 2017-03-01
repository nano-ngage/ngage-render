import Inferno from 'inferno';
import Component from 'inferno-component';

import Modal from '../containers/Modal.jsx';

export default (props) => {
  return (
    <div classname="center">
      <div>{props.children}</div>
      <Modal />
    </div>
    )
}
