import { useEffect, useRef } from "react";
import './style.sass';

export function Modal({ isOpen, onClose, children }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    })
    return (
        <section className="section_modal">
            <dialog ref={dialogRef} onCancel={onClose}>
                <section className="header_modal">
                    <button type="button" onClick={onClose} aria-label="Fechar">✕</button>
                </section>
                <section>
                    {children}
                </section>
            </dialog>
        </section>
    )
}