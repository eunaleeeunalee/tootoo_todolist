import React from "react";
import {useRecoilState, useRecoilValue} from "recoil"
import { categoryState, todoSelector, allCategory, yourName} from "../atoms";
import CreateToDo from "./CreateToDo";
import CreateCate from "./CreateCate";
import Todo from "./Todo";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Name from "./Name";

const Container = styled.div`
    padding: 5vh 20px;
    max-width: 480px;
    margin: 4vh auto;
    justfy-content: center;
    align-items: center;
    text-align: center;
    background-color: ${props => props.theme.bgColor};
`;

const Header = styled.header`
    height: 10vh;
    flex: 1;
`;

const Title = styled.h1`
    font-size: 50px;
    text-align: center;
`;

const Img = styled.img`
    max-width: 320px;
`;

const Parole = styled.h1`
    margin: 3vh 0;
    font-size: 20px;
    line-height: 30px;
    color: ${props => props.theme.accentColor};
    text-align: center;
    select{
        margin: 0 1vh;
    }
`;

const Select = styled.select`
    border: none;
    border-bottom: solid 2px ${props => props.theme.accentColor};
    background: transparent;
    font-size: 20px;
    color: ${props => props.theme.accentColor};
    &:focus {
        outline: none;
    }
`;

const Hr = styled.hr`
    border: dotted 1px ${props => props.theme.accentColor};
    margin: 5vh 0;
`;


function ToDoList(){
    const toDos = useRecoilValue(todoSelector);
    const allCate = useRecoilValue(allCategory);
    const name = useRecoilValue(yourName);
    console.log(allCate);
    const all_keys = Object.keys(allCate)
    const [category, setCategory] = useRecoilState(categoryState);

    const onInput = (event:React.FormEvent<HTMLSelectElement>) =>{
        setCategory(event.currentTarget.value as any);
    };
    return (
        <Container>
            <Helmet>
                <title>TOOTOO TODO</title>
            </Helmet>
            <Header>
                <Title>TOOTOO TODO</Title>
            </Header>
            <Img src="https://mblogthumb-phinf.pstatic.net/20141024_233/aibb1233_1414115833231Usc4j_JPEG/%C5%F5%C5%F5.JPG?type=w2"/>
            <Parole>
            Tootoo: Hey {name},<br/>
            complete your ToDo before 
                <Select value={category} onInput = {onInput}>
                    {all_keys?.map((keey, index) => (
                        <option key={index} value = {keey}>{keey}</option>
                    ))}
                </Select> !
            </Parole>
            
            {toDos?.map((toDo) => (
                <Todo key={toDo.id} {...toDo} />
            ))}
            <Hr/>
            <Name />
            <CreateToDo/>
            <CreateCate/>
        </Container>
    );
}


export default ToDoList;