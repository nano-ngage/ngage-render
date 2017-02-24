import Inferno from 'inferno';
import Component from 'inferno-component';

export default (props) => {
  return (
    <div classname="center">
      <div>{props.children}</div>
    </div>
    )
}