import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { ITodo, toDoState, allCategory } from "../atoms";
import styled from "styled-components";

const Btn = styled.button`
    border: solid 2px ${props => props.theme.accentColor};
    background: transparent;
    color: ${props => props.theme.accentColor};
    margin: 0 0.3vh;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;

const Btn2 = styled.span`
    &:hover{
        text-decoration-line: line-through;
        cursor: pointer
    }
`;



function Todo({text, category, id}:ITodo){
    const setToDos = useSetRecoilState(toDoState);
    const allCate = useRecoilValue(allCategory);
    console.log(allCate);
    const all_keys = Object.keys(allCate)
    const onClick = (event:React.MouseEvent<HTMLButtonElement>)=>{
        const {currentTarget: {name}} = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const oldTodo = oldToDos[targetIndex];
            const newToDo = { text, id, category: name as any};
            console.log(oldTodo, newToDo)
            return [
                ...oldToDos.slice(0, targetIndex), 
                newToDo, 
                ...oldToDos.slice(targetIndex+1),];
        });
    }
    
    const deleteTodo = () => {
        setToDos((oldTodos) => {
            const after = oldTodos.filter((old) => old.id !== id);
            return after;
        })
    }

      
    return(
        <li style={{ margin: "2vh 0"}}>
            <Btn2 onClick={deleteTodo}>{text}</Btn2>
            {all_keys?.map((keey, index) => (
                    <Btn key={index} onClick = {onClick} name = {keey}>{keey}</Btn>
            ))}
        </li>
        );

}

export default Todo;