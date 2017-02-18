import Inferno from 'inferno';
import Component from 'inferno-component';

export default (props) => {
  return (
    <div>
      <h1>Welcome to nGage</h1>
      <div>{props.children}</div>
    </div>
    )
}