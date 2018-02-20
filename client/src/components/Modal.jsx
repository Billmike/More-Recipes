import React from 'react';
import Modal from 'react-modal';

const DeleteModal = props => (
  <Modal
    isOpen={!!props.selectedRecipe}
    contentLabel="Delete Recipe?"
    onRequestClose={props.handleClearSelectedRecipe}
    closeTimeoutMS={300}
    className="modal-class"
    ariaHideApp={false}
  >
    <h3 className="modal-ptag"> Delete Recipe? </h3>
    <p className="modal-ptag"> Do you want to delete this recipe?</p>
    <div className="group-btn">
      <button
        className="btn btn-danger user-btn"
        onClick={props.onRemoveRecipe}
      >
        Yes
      </button>
      <button
        className="btn user-btn"
        onClick={props.handleClearSelectedRecipe}
      >
        No
      </button>
    </div>
  </Modal>
);

export default DeleteModal;