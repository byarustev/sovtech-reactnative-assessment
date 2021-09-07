import React, {createContext, useState} from 'react';
export const CategoryJokeContext = createContext();

export const CategoryJokeProvider = (props) =>{
    const [joke, setJoke] = useState({});

    return (
        <CategoryJokeContext.Provider value={[joke, setJoke]}>
            {props.children}
        </CategoryJokeContext.Provider>
        );
}
