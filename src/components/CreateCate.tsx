import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { allCategory } from "../atoms";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface ICata{
    newCat: string;
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

function CreateCate() {
    const setCategory = useSetRecoilState(allCategory);
    const oldcate = useRecoilValue(allCategory);
    const {register, handleSubmit, setValue} = useForm();
    const onClick = ({newCat}: ICata) => {
        // event.preventDefault();
        const newcategory = {[newCat]: newCat}
        setCategory((old: ICata) => {
            return{ ...old, ...newcategory
            }})
        setValue("newCat", "")
    }
    return(
        <form style={{ margin: "3vh 0"}}>
            <Input
            {...register("newCat",{
                required: "idiot"
            })} 
                placeholder="write another deadline (optional)"/>
            <Btn onClick={handleSubmit(onClick as any)}>add</Btn>
            <br/>
        </form>
            
    )
}

export default CreateCate;