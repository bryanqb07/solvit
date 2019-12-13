import React, { Component } from "react";
import Modal from '../Modal';
import Cart from './Cart'

const CartContainer = () => {
    state = { show: false };

    const showModal = (e) => {
        e.stopPropagation();
        this.setState({ show: true });
    };

    consthideModal = (e) => {
        e.stopPropagation();
        this.setState({ show: false });
    };

    return (
        <div>
            <Modal show={this.state.show} handleClose={this.hideModal}>
                <Cart />
            </Modal>
            <i
                onClick={this.showModal}
                className="fa fa-shopping-cart">
            </i>
        </div>
    );
}

export default CartContainer;