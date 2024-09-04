import styled from "styled-components";

type HeaderComponentProps = {
    name?:string,
    strong?:boolean,
    icon?:React.ReactNode;
}

export default function HeaderComponent({name,strong,icon}:HeaderComponentProps) {
    const P = styled.p<{$strong?:boolean;}>`
        @font-face {
            font-family: 'Porto Roobert';
            src: url("../../assets/fonts/PortoRoobert-Medium.otf");
            font-weight: 400;
        }

        @font-face {
            font-family: 'Porto Roobert';
            src: url("../../assets/fonts/PortoRoobert-Bold.otf");
            font-weight: 900;
        }

        font-family: 'Porto Roobert', sans-serif;
        font-size: ${props => props.$strong? "1.5rem":"1.2rem"};
        font-weight: ${props => props.$strong? "700":"400"};
        color: ${props => props.$strong? "#01A1FD":"#1E272F"}
    `;

    const Icon = styled.div``

    return (
        <>
            <Icon>
              {icon}
            </Icon>
            <P $strong={strong}>{name}</P>
        </>
    )
}