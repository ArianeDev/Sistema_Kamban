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
                <header>
                    <button type="button" onClick={onClose} aria-label="Fechar">✕</button>
                </header>
                <section>
                    {children}
                </section>
            </dialog>
        </section>
    )
}