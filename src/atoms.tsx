import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'

const {persistAtom} = recoilPersist()


export enum Categories{
    "this weekend" = "this weekend",
    "tonight" = "tonight",
    "tomorrow" = "tomorrow",
}

export interface ITodo {
    text: string;
    id: number;
    category: Categories;
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.tonight,
})

export const allCategory = atom({
    key: "all_category",
    default: Categories,
    effects_UNSTABLE: [persistAtom]
})

export const yourName = atom({
    key: "name",
    default: "You",
    effects_UNSTABLE: [persistAtom]
})

export const toDoState = atom<ITodo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom]
});

export const todoSelector = selector({
    key: "todoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    }, 
})