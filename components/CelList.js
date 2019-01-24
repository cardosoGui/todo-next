import React from "react"
import AppContext from "./AppContext"

import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"

const CelList = ({ items, onDeleteItem }) => {
    return (
        <AppContext.Consumer>
            {({ finish, setAppState }) => (
                <Col>
                    <table
                        style={{ textAlign: "center" }}
                        className="nes-table is-bordered is-centered"
                    >
                        <thead>
                            <tr>
                                <th>""</th>
                                <th>Task Name</th>
                                <th>Task Subject</th>
                                <th>Date Start</th>
                                <th>Date Finish</th>
                                <th>Description</th>
                                <th>X</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((value, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <label htmlFor="checkbox">
                                                <input
                                                    type="checkbox"
                                                    className="nes-checkbox"
                                                    checked
                                                />
                                            </label>
                                        </td>
                                        <td> {value.task_name}</td>
                                        <td> {value.task_subject}</td>
                                        <td>
                                            {new Date(
                                                value.date_start
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            {new Date(
                                                value.date_finish
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <p>{value.task_description}</p>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    setAppState({
                                                        finish: "VINI MASTER"
                                                    }) || onDeleteItem(value.id)
                                                }
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {/* <pre>{JSON.stringify(finish, null, 4)}</pre> */}
                </Col>
            )}
        </AppContext.Consumer>
    )
}

export default CelList
