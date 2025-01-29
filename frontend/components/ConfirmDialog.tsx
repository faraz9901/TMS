import React from 'react'

interface ConfirmDialogProps {
    confirmMessage?: string
    confirmText?: string
    cancelBtnClassName?: string
    confirmBtnClassName?: string
    onConfirm: () => void
    onClose?: () => void
}

export default function ConfirmDialog({ confirmMessage = "Are you sure ?", confirmText = "Yes", cancelBtnClassName = "btn btn-sm", confirmBtnClassName = "btn btn-sm", onConfirm, onClose }: ConfirmDialogProps) {

    const onCancel = (e: React.MouseEvent) => {
        e.preventDefault()
        const dialog = document.getElementById("confirm-dialog") as HTMLDialogElement || null
        dialog?.close()
        if (onClose) onClose()
    }

    return (
        <dialog id="confirm-dialog" className="modal">
            <div className="modal-box">
                <p>
                    {confirmMessage}
                </p>
                <div className="modal-action">

                    <button onClick={onConfirm} className={confirmBtnClassName}>{confirmText}</button>


                    <button onClick={onCancel} className={cancelBtnClassName}>Close</button>

                </div>
            </div>
        </dialog>
    )
}
