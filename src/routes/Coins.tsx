import { Link } from "react-router-dom";
import styled from "styled-components";
import {useQuery} from "react-query";
import {fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";


const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 12vh;
    margin: 3vh 0 4vh 0;
    flex: 1;
    justfy-content: center;
    align-items: center;
    text-align: center;
`;

const Btn = styled.button`
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.button};
  font-size: 25px;
  cursor: pointer;
  padding: 6px;
  transition-property: font-size;
  transition-duration: 0.5s;
  &:hover{
    font-size: 35px;
   }
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.button};
    color:${(props) => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a{
        display: flex;
        padding: 20px;
        transition-property: padding, color;
        transition-duration: 0.5s, 0.2s;
        align-items: center;
    }
    &:hover{
        a{
            padding: 32px 20px;
            color: ${(props) => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    font-size: 50px;
    color: ${props => props.theme.accentColor};
    text-align: center;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;

interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    type: string,
};

interface ICoionsProps{
}

function Coins({}: ICoionsProps) {
    const { isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const isDark = useRecoilValue(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom( prev => !prev);
    
    return (
    <Container>
        <Helmet>
            <title>Coin Coin Coin 🦆</title>
        </Helmet>
        <Header>
            <Title>Coin Coin Coin 🦆</Title>
            <br/>
            <Btn onClick={toggleDarkAtom}>{isDark? "🌛" : "🌞"}</Btn>
        </Header>
        
        
        {isLoading ? (
            <Loader>Loading...</Loader>
        ):(
        <CoinList>
        {data?.slice(0, 100).map((coin) => (
        <Coin key = {coin.id}>
            <Link to={{
                pathname: `/${coin.id}`,
                state: {name: coin.name},
            }}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                {coin.name} &rarr; 
            </Link>
            </Coin>
        ))}
        </CoinList>)}
    </Container>
    )
}

export default Coins