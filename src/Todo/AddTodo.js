import React, {useState} from "react";
import PropTypes from 'prop-types'

function useInputValue(defaultValue = '') {//Кастомный хук для input
    const [value, setValue] = useState(defaultValue) //логика по опред value

    return {//в качестве значения вернем объект. Объект к-ый возвращаем из данного хука, содержит ключи для inputa
        bind: {
            value,
            onChange: event => setValue(event.target.value) //значение onChange, функция к-ая принимает event, она будет обращаться к методу setValue и задавать знач event.target.value 
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function AddTodo( {onCreate} ) {
    const input = useInputValue('')//воспользуемся своим хуком 

    function submitHandler(event) {
        event.preventDefault()//отменяет дефолтное значение, чтобы страница не перезагружалась 

        if (input.value().trim()) {//валидация, трим удаляет лишние пробелы. Чтобы получить знач обр к функ value()
            onCreate(input.value())//после создания хука, нету параметра value, но есть input со знач value
            input.clear()//чтобы очищалось поле после добавления эл-та, обр к функ clear()
        }
    }

    return (//с помощью оператора спред ... развернули объект inputa. т.е он поместит value и onChange
        <form style={{marginBottom: '1rem' }} onSubmit={submitHandler}>
            <input {...input.bind} /> 
            <button type='submit'>Add todo</button>
        </form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;