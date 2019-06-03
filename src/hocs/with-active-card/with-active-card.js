const withActiveCard = (Component) => {
  class WithActiveCard extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        actionCard: null
      };

      this._setActionCard = this._setActionCard.bind(this);
      this._clearActionCard = this._clearActionCard.bind(this);
    }

    _setActionCard(card) {
      this.setState({
        actionCard: card
      });
    }

    _clearActionCard() {
      this.setState({
        actionCard: null
      });
    }

    render() {
      return <Component
        actionCard={this.state.actionCard}
        setActionCard={this._setActionCard}
        clearActionCard={this._clearActionCard}
        {...this.props}
      />;
    }
  }

  return WithActiveCard;
};

export default withActiveCard;
