/**
 * Create Delete alert Element.
 *
 * @param {Object} param alert infomation
 */
export default function createDeleteAlert({ modalDesText, onOkBtn }) {
  // Modal
  const deleteModal = document.createElement("div");
  deleteModal.id = "delete-alert";
  deleteModal.classList.add("modal", "fade");
  deleteModal.tabIndex = -1;

  // Modal Dialog
  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");
  deleteModal.append(modalDialog);

  // Modal Content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalDialog.append(modalContent);

  // Modal Header
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const modalTitle = document.createElement("h1");
  modalTitle.classList.add("modal-title", "fs-4", "fw-bold");
  modalTitle.innerText = "Xóa";

  const closeButton = document.createElement("button");
  closeButton.classList.add("btn-close");
  closeButton.type = "button";
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");

  modalHeader.append(modalTitle, closeButton);

  // Modal Body
  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  const modalDes = document.createElement("p");
  modalDes.innerText = modalDesText;
  modalBody.append(modalDes);

  // Modal Footer
  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer");

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("btn", "btn-outline-secondary", "rounded-pill");
  cancelButton.setAttribute("data-bs-dismiss", "modal");
  cancelButton.setAttribute("aria-label", "Close");
  cancelButton.innerText = "Bỏ qua";

  const okButton = document.createElement("button");
  okButton.classList.add("btn", "btn-pure-red", "text-white", "rounded-pill");
  okButton.setAttribute("data-bs-dismiss", "modal");
  okButton.innerText = "Đồng ý";

  modalFooter.append(cancelButton, okButton);

  modalContent.append(modalHeader, modalBody, modalFooter);

  document.body.appendChild(deleteModal);

  // Handle event
  const bsDeleteModal = new bootstrap.Modal(deleteModal);

  bsDeleteModal.show();

  deleteModal.addEventListener("hide.bs.modal", () => {
    deleteModal.remove();
  });

  okButton.onclick = () => {
    onOkBtn();
    bsDeleteModal.hide();
  };
}
