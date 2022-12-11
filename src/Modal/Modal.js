import React from 'react'
import './Modal.css'

export default class Modal extends React.Component { //Класс наследуется от реакт компонент
    state = {
        isOpen: false //по умолчанию модалка скрыта
    }
    
    
    render() { //метод рендер, чтобы здесь реализовать шаблон
        return (//в стейте ретерн будем возращать какой-то код
            /*будет 2 корн.эл, чтобы реакт не добавлял корневые эл-ты React.Fragment */
            <React.Fragment>
               <button onClick={() => this.setState({ isOpen: true /*при клике на кнопку открываем модалку, т.е меняем стейт. свойством клик, вызываем this метод setState, указ знач, флагу isOpen указ знач true*/})}>
                    Open modal
                </button>

               {this.state.isOpen && (//получаем состояние стейта, если он тру бедем показывать модалку
                <div className='modal'>
                        <div className='modal-body'>
                            <h1>Modal title</h1>
                            <p>i am awesome modal!</p>
                            <button onClick={() => this.setState({ isOpen: false})} /*закрываем модалку*/>
                                Close modal
                            </button>
                        </div>
                </div>
               )}
            </React.Fragment>
        )
    }
}