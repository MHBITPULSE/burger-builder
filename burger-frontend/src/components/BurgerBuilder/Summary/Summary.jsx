import React from 'react'

const Summary = ({ ingredients }) => {
      return (
            <div>
                  <ul>
                        {ingredients.map((item, index) => {
                              return (
                                    <li key={index}>
                                          <span>{item.type}: {item.amount}</span>
                                    </li>
                              )
                        })}
                  </ul>
            </div>
      )
}

export default Summary