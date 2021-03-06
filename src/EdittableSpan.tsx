import React, {ChangeEvent, useState} from "react";


type EdittableSpanType = {
    title: string
    onChangeTitle: (title: string)=> void

}

const EdittableSpan: React.FC<EdittableSpanType> = (props)=> {
    const[editMode, setEditMode] = useState(false);
    const[title, setTitle] = useState("");

    /*const onEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const offEditMode = () => {
        setEditMode(false);
        props.onChangeTitle(title);
    }*/

    const changeEditMode = (value: boolean) => {
        setEditMode(value);
        if (value) {
            setTitle(props.title);
        } else {
            props.onChangeTitle(title);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changeEditMode(false);
        }
    }
    return(
        <>
            {
                editMode
                ? <input
                        value={title}
                        onChange={onChangeHandler}
                        onBlur={()=>changeEditMode(false)}
                        onKeyPress={onKeyHandler}
                        autoFocus>
                    </input>
                : <span onDoubleClick={()=>changeEditMode(true)} >{props.title}</span>
            }
        </>
    )
}

export {
    EdittableSpan
}