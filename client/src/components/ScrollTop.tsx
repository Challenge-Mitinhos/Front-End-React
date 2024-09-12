import { useEffect, useState } from "react";
import styled from "styled-components";
import { scrollTop } from "../util/util.ts";

const ArrowButton = styled.button`
    width: 3.5em;
    height: 3.5em;
    border-radius: 100%;
    align-self: center;
    text-align: center;
    border: none;
    background-color: transparent;
    background-image: url("/img/arrow-up-circle-svgrepo-com.svg");
    background-position: center;
    background-size: cover;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    position: fixed;
    z-index: 234;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.5);
    top: 3vh;
    opacity: 0;
    visibility: hidden;
    transition: all .2s ease;
    
    &.visible {
        opacity: 1;
        visibility: visible;
    }

    &:hover {
        cursor: pointer;
    }
`

export default function ScrollTop() {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
    if (window.scrollY >= 140) {
        setScrolled(true);
    } else {
        setScrolled(false);
    }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return(
        <>
            <ArrowButton className={scrolled? 'visible' : ''} onClick={scrollTop}></ArrowButton>
        </>
    )
}