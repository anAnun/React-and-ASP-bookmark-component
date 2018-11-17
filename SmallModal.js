import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/*

HOW TO SHOW A MODAL:

// at the top:
import { showModal } from './SmallModal';

// somewhere later in your code:
showModal({
    title: 'This is the title!',
    body: 'body here!!'
}).then(
    () => console.log('ok!'),
    () => console.log('cancelled')    
    }
);

*/

const modalStyles = {
  default: {
    header: "",
    button: "btn-theme"
  },
  primary: {
    header: "modal-primary",
    button: "btn-primary"
  },
  success: {
    header: "modal-success",
    button: "btn-success"
  },
  info: {
    header: "modal-info",
    button: "btn-success"
  },
  warning: {
    header: "modal-warning",
    button: "btn-warning"
  },
  danger: {
    header: "modal-danger",
    button: "btn-danger"
  },
  lilac: {
    header: "modal-lilac",
    button: "btn-lilac"
  },
  teal: {
    header: "modal-teal",
    button: "btn-teal"
  }
};

class SmallModal extends React.Component {
  render() {
    return (
      <div
        className={
          "modal fade bs-example-modal-sm " +
          modalStyles[this.props.modalStyle || "default"].header
        }
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                onClick={this.props.onClose}
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              <p>{this.props.body}</p>
            </div>
            <div className="modal-footer">
              {this.props.closeButtonText !== false && (
                <button
                  type="button"
                  onClick={this.props.onClose}
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  {this.props.closeButtonText || "Cancel"}
                </button>
              )}
              <button
                type="button"
                onClick={this.props.onOk}
                className={
                  "btn " +
                  modalStyles[this.props.modalStyle || "default"].button
                }
                data-dismiss="modal"
              >
                {this.props.okButtonText || "Ok"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SmallModal.propTypes = {
  modalStyle: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  closeButtonText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  okButtonText: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export function showModal(props) {
  if (props.onOk || props.onClose) {
    throw Error(
      "Do not pass onOk or onClose to showModal. Use the promise callbacks instead."
    );
  }

  return new Promise((resolve, reject) => {
    const container = document.getElementById("recruithub-modal");
    ReactDOM.render(
      <SmallModal {...props} onOk={resolve} onClose={() => reject()} />,
      container,
      () => {
        const modalContainer = window.jQuery(container.children[0]);
        modalContainer.on("hidden.bs.modal", reject);
        modalContainer.modal();
      }
    );
  });
}
