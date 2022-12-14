import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { toDoState, categoryState } from "../atoms";
import styled from "styled-components";

interface IFormData {
    toDo: string;
    }

const Btn = styled.button`
    width: 10%;
    border: solid 2px ${props => props.theme.accentColor};
    background: transparent;
    color: ${props => props.theme.accentColor};
    cursor: pointer;
`;

const Input = styled.input`
    width: 70%;
    margin-right: 3%;
    border: none;
    border-bottom: 2px solid ${props => props.theme.accentColor};
    background: transparent;
    color: ${props => props.theme.accentColor};
    ::placeholder{
        color: #bb7f96;
    }
    &:focus {
        outline: none;
    }
`;

function CreateToDo(){
    const setTodos = useSetRecoilState(toDoState);
    const old = useRecoilValue(toDoState);
    // localStorage.setItem("todos", JSON.stringify(old))
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IFormData>();
    const onValid = ({toDo}:IFormData) => {
        const todos = {text: toDo, id: Date.now(), category}
        setTodos(oldTodos => [todos, ...oldTodos])
        setValue("toDo", "")
    };
    return (
        <form onSubmit={handleSubmit(onValid)} style={{ margin: "3vh 0"}}>
            <Input 
            {...register("toDo", {
                required: "idiot"
            })} 
                placeholder="write a toDo"/>
            <Btn>add</Btn>
        </form>
    )
}

export default CreateToDo;