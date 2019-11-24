import React, { Component } from "react";
import Modal from '../Modal';
import Cart from './Cart'

class CartContainer extends Component {
    state = { show: false }

    showModal = (e) => {
        e.stopPropagation();
        this.setState({ show: true });
    };

    hideModal = (e) => {
        e.stopPropagation();
        this.setState({ show: false });
    };

    render() {
        return (
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <Cart />
                </Modal>
                <i
                    onClick={this.showModal} 
                    className="fa fa-shopping-cart w3-margin-right">
                </i>
            </div>
        );
    }
};

export default CartContainer;