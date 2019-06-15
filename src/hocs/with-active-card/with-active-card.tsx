import * as React from 'react';

import {OfferType} from '../../types';

interface State {
  actionCard: OfferType
}

const withActiveCard = (Component) => {
  class WithActiveCard extends React.PureComponent<React.ComponentProps<typeof Component>, State> {
    constructor(props) {
      super(props);

      this.state = {
        actionCard: null
      };

      this._onSetActionCard = this._onSetActionCard.bind(this);
    }

    render() {
      return <Component
        actionCard={this.state.actionCard}
        onSetActionCard={this._onSetActionCard}
        {...this.props}
      />;
    }

    _onSetActionCard(card: OfferType) {
      this.setState({
        actionCard: card
      });
    }
  }

  return WithActiveCard;
};

export default withActiveCard;
