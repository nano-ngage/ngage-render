import Inferno from 'inferno';
import Component from 'inferno-component';

export default class List extends Component {
  render() {
    const ItemType = this.props.itemType;
    const items = this.props.items || [];
    const markupItems = this.createItemsMarkup(items, ItemType);

    return (
      <ul className={this.props.ulClass}>
        {markupItems}
      </ul>
    );
  }

  createItemsMarkup(items, Type) {
    const markupItems = items.map((item, index) => {
      const newItem = Object.assign({}, item);
      return (
        <li key={index} >
          <Type data={newItem} />
        </li>
      );
    });

    return markupItems;
  }
}
