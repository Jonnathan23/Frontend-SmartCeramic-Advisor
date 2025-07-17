import { useState } from "react";

export default function AsideMenu() {
    const [showMenuDetails, setShowMenuDetails] = useState(false);

    const handleShowMenuDetails = () => setShowMenuDetails(!showMenuDetails);
    return (
        <>
            <aside className={!showMenuDetails ? 'aside' : 'hide-aside'}>
                <button className="aside__button-menu" onClick={handleShowMenuDetails}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f9f9f3"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M4 4h6v6h-6z" />
                        <path d="M14 4h6v6h-6z" />
                        <path d="M4 14h6v6h-6z" />
                        <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    </svg>
                </button>
            </aside>

            <aside className={showMenuDetails ? 'aside-details' : 'hide-aside'}>
                <button className="aside__button aside__button--close" onClick={handleShowMenuDetails}>
                    <svg
                        className="aside__button__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f9f9f3"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M4 4h6v6h-6z" />
                        <path d="M14 4h6v6h-6z" />
                        <path d="M4 14h6v6h-6z" />
                        <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    </svg>
                    <p>Ocultar</p>
                </button>
                <button className="aside__button">
                    <svg
                        className="aside__button__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f9f9f3"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                    <p>Nueva busqueda</p>
                </button>
                <button className="aside__button">
                    <svg
                        className="aside__button__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f9f9f3"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 8l0 4l2 2" />
                        <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                    </svg>
                    <p>Busquedas anteriores</p>

                </button>

            </aside>
        </>
    );
}
