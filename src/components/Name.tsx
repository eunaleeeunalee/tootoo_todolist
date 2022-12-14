import React from "react";
import { useSetRecoilState } from "recoil";
import { yourName } from "../atoms";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface IName{
    name: string;
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

function Name() {
    const setName = useSetRecoilState(yourName);
    const {register, handleSubmit, setValue} = useForm();
    const onClick = ({name}: IName) => {
        setName(name);
        setValue("toDo", "");
    }
    return(
        <form style={{ margin: "3vh 0"}}>
            <Input
            {...register("name",{
                required: "idiot"
            })} 
                placeholder="write your name (optional)"/>
            <Btn onClick={handleSubmit(onClick as any)}>add</Btn>
            <br/>
        </form>
            
    )
}

export default Name;