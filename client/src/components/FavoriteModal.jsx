import React from 'react';
import Modal from 'react-modal';

const FavoriteModal = props => (
  <Modal
    isOpen={!!props.selectedFavorite}
    onRequestClose={props.handleClearFavoriteRecipe}
    closeTimeoutMS={300}
    className="modal-class"
    ariaHideApp={false}
  >
    <h3 className="modal-ptag"> Remove recipe</h3>
    <p className="modal-ptag"> Are you sure want to remove this recipe?</p>
    <div className="group-btn">
      <button
        className="btn btn-danger user-btn modal-btn-red"
        onClick={props.removeFavorite}
      >
        Yes
      </button>
      <button
        className="btn user-btn modal-btn-white"
        onClick={props.handleClearFavoriteRecipe}
      >
        No
      </button>
    </div>
  </Modal>
);

export default FavoriteModal;
