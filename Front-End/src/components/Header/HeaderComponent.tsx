import styled from "styled-components";

type HeaderComponentProps = {
    name?:string,
    strong?:boolean,
    icon?:React.ReactNode,
    onClick?:()=>void;
}

export default function HeaderComponent({name,strong,icon,onClick}:HeaderComponentProps) {
    const P = styled.p<{strong?:boolean;}>`
        
        font-family: 'Porto-Font', sans-serif;
        font-size: ${props => props.strong? "2.3rem":"1.3rem"};
        font-weight: ${props => props.strong? "600":"300"};
        color: ${props => props.strong? "#01A1FD":"#1E272F"};
        transition: all ease-in-out 0.15s;

        &:hover{
            color: ${props => props.strong? "#63c6ff":"rgb(94, 94, 94)"};
            cursor: pointer;
        }
    `;


    return (
        <div onClick={onClick}>
            {icon}
            <P strong={strong}>{name}</P>
        </div>
    )
}