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
    <h3> Remove recipe from list of favorites?</h3>
    <div className="group-btn">
      <button
        className="btn btn-danger user-btn"
        onClick={props.removeFavorite}
      >
        Yes
      </button>
      <button
        className="btn user-btn"
        onClick={props.handleClearFavoriteRecipe}
      >
        No
      </button>
    </div>
  </Modal>
);

export default FavoriteModal;
