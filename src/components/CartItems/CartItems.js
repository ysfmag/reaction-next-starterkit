import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@reactioncommerce/components/Button/v1";
import CartItemsList from "@reactioncommerce/components/CartItems/v1";

const components = {
  // TODO: Use QuantityInput component when MUI dependency is removed.
  QuantityInput: "div"
};

const styles = (theme) => ({
  loadMore: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

@withStyles(styles)
class CartItems extends Component {
  static propTypes = {
    classes: PropTypes.object,
    hasMoreCartItems: PropTypes.bool,
    isMiniCart: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      attributes: PropTypes.arrayOf(PropTypes.object),
      currencyQuantity: PropTypes.number,
      imageUrl: PropTypes.string,
      isLowInventoryQuantity: PropTypes.bool,
      price: PropTypes.shape({
        displayPrice: PropTypes.string,
        compareAtPrice: PropTypes.string
      }),
      productSlug: PropTypes.string,
      title: PropTypes.string,
      quantity: PropTypes.number
    })).isRequired,
    onChangeCartItemQuantity: PropTypes.func.isRequired,
    onLoadMoreCartItems: PropTypes.func,
    onRemoveItemFromCart: PropTypes.func.isRequired
  }

  handleItemQuantityChange = (quantity) => {
    const { onChangeCartItemQuantity } = this.props;

    onChangeCartItemQuantity(quantity);
  }

  handleRemoveItem = (_id) => {
    const { onRemoveItemFromCart } = this.props;

    onRemoveItemFromCart(_id);
  }

  render() {
    const {
      classes,
      items,
      isMiniCart,
      hasMoreCartItems,
      onLoadMoreCartItems
    } = this.props;

    return (
      <Fragment>
        <CartItemsList
          isMiniCart={isMiniCart}
          items={items}
          components={components}
          onChangeCartItemQuantity={this.handleItemQuantityChange}
          onRemoveItemFromCart={this.handleRemoveItem}
        />
        {hasMoreCartItems &&
          <div className={classes.loadMore}>
            <Button
              isShortHeight={isMiniCart}
              isTextOnly
              onClick={onLoadMoreCartItems}
            >
              {"Load More"}
            </Button>
          </div>
        }
      </Fragment>
    );
  }
}

export default CartItems;
