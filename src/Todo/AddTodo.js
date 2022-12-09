import React, {useState} from "react";
import PropTypes from 'prop-types'

function AddTodo( {onCreate} ) {
    const [value, setValue] = useState('')

    function submitHandler(event) {
        event.preventDefault()/*отменяет дефолтное значение, чтобы страница не перезагружалась */

        if (value.trim()) {/*валидация, трим удаляет лишние пробелы*/
            onCreate(value)
            setValue('')/*чтобы очищалось поле после добавления эл-та, вызовем метод setValue со знач пустой строки т.е изм данный стейт */
        }
    }

    return (
        <form style={{marginBottom: '1rem' }} onSubmit={submitHandler}>
            <input value={value} onChange={event => setValue(event.target.value)} />
            <button type='submit'>Add todo</button>
        </form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;