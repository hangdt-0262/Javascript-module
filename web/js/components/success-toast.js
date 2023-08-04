/**
 * Create Success Toast.
 * 
 * @param {String} toastDescription text of toast's body
 */
export default function createSuccessToast(toastDescription) {
  // Container
  const successToastContianer = document.createElement("div");
  successToastContianer.classList.add(
    "toast-contianer",
    "position-fixed",
    "top-0",
    "end-0",
    "p-3",
    "z-3",
  );

  // Main
  const successToast = document.createElement("div");
  successToast.classList.add("toast", "fade");
  successToast.role = "alert";
  successToast.setAttribute("aria-live", "assertive");
  successToast.setAttribute("aria-atomic", true);
  successToastContianer.appendChild(successToast);

  // Header
  const toastHeader = document.createElement("div");
  toastHeader.classList.add("toast-header");

  // Icon
  const toastIcon = document.createElement("span");
  toastIcon.classList.add("bd-placeholder-img", "me-2", "text-md-sea-green");
  toastIcon.innerHTML = '<i class="fa-solid fa-check-double"></i>';

  // Title
  const toastTitle = document.createElement("strong");
  toastTitle.innerHTML = "Thành công";
  toastTitle.classList.add("me-auto");

  // Close Button
  const toastClose = document.createElement("button");
  toastClose.classList.add("btn-close");
  toastClose.setAttribute("data-bs-dismiss", "toast");
  toastClose.setAttribute("aria-label", "Close");

  toastHeader.append(toastIcon, toastTitle, toastClose);

  // Body
  const toastBody = document.createElement("div");
  toastBody.classList.add("toast-body");
  toastBody.innerHTML = `<p class="mb-0">${toastDescription}</p>`;

  successToast.append(toastHeader, toastBody);

  document.body.appendChild(successToastContianer);

  // Handle event
  const bsSuccessToast = new bootstrap.Toast(successToast);
  bsSuccessToast.show();

  successToast.addEventListener("hide.bs.toast", () => {
    successToastContianer.remove();
    window.document.location.reload();
  });
}
