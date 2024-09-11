import styled from "styled-components";

type HeaderComponentProps = {
    name?:string,
    strong?:boolean,
    icon?:React.ReactNode,
    onClick?:()=>void,
    fontSize?:string,
    style?:React.CSSProperties;
}

const P = styled.p<{strong?:boolean, fontSize?:string;}>`
    font-size: ${(props) => props.fontSize || (props => props.strong? "3vh":"2.2vh")};
    font-weight: ${props => props.strong? "700":"500"};
    color: ${props => props.strong? "#01A1FD":"#1E272F"};
    transition: all ease-in-out 0.15s;

    &:hover{
        color: ${props => props.strong? "#63c6ff":"rgb(94, 94, 94)"};
        cursor: pointer;
    }
`;

const DivStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`


export default function HeaderComponent({name,strong,icon,onClick,fontSize,style}:HeaderComponentProps) {

    return (
        <div onClick={onClick} style={style}>
            <DivStyled>
                {icon}
            </DivStyled>
            <P strong={strong} fontSize={fontSize}>{name}</P>
        </div>
    )
}