import React from "react"

import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"

import { compose, withStateHandlers } from "recompose"
import CelList from "./CelList"

const canUseDOM = typeof window !== "undefined"

const isSerializableObject = obj => {
    try {
        JSON.parse(obj)
    } catch (e) {
        return false
    }
    return true
}

const getLocalTasks = () =>
    !canUseDOM
        ? []
        : Object.entries(localStorage)
              .filter(
                  ([key, value]) =>
                      key.startsWith("t_") && isSerializableObject(value)
              )
              .map(([key, value]) => {
                  const task = JSON.parse(value)
                  task.id = key
                  return task
              })

export const TodoFormInputs = compose(
    withStateHandlers(
        {
            form: {},
            tasks: getLocalTasks(),
            sending: false
        },
        {
            updateForm: ({ form }) => event => ({
                form: { ...form, [event.target.id]: event.target.value }
            }),
            submitTasks: ({ tasks }) => form => {
                const id = "t_" + +new Date()
                const task = { id, ...form }

                localStorage.setItem(id, JSON.stringify(form))

                return { tasks: tasks.concat(task) }
            },
            deleteTask: ({ tasks }) => tid => {
                localStorage.removeItem(tid)

                return { tasks: tasks.filter(({ id }) => id !== tid) }
            },
            setTasks: () => tasks => ({ tasks })
        }
    )
)(({ form, updateForm, tasks, submitTasks, deleteTask }) => (
    <>
        <Row>
            <Col mdOffset={1} lgOffset={1} md={3} lg={3}>
                <label htmlFor="name">Task name</label>
                <input
                    type="text"
                    id="task_name"
                    onChange={updateForm}
                    className="nes-input"
                />
            </Col>
            <Col md={3} lg={3}>
                <label htmlFor="name_field">Subject name</label>
                <input
                    type="text"
                    id="task_subject"
                    onChange={updateForm}
                    className="nes-input"
                />
            </Col>
            <Col md={2} lg={2}>
                <label htmlFor="name_field">Date to start</label>
                <input
                    type="date"
                    id="date_start"
                    onChange={updateForm}
                    className="nes-input"
                />
            </Col>
            <Col md={2} lg={2}>
                <label htmlFor="name_field">Date to finish</label>
                <input
                    type="date"
                    id="date_finish"
                    onChange={updateForm}
                    className="nes-input"
                />
            </Col>
        </Row>
        <Row>
            <Col mdOffset={1} lgOffset={1} md={10} lg={10} className="field">
                <br />
                <label htmlFor="task_description">Task description</label>
                <textarea
                    type="text"
                    id="task_description"
                    onChange={updateForm}
                    className="nes-textarea"
                    style={{ height: "5em" }}
                />
            </Col>

            <Col mdOffset={1} lgOffset={1} md={10} lg={10}>
                <button
                    className="nes-btn is-primary"
                    onClick={() => submitTasks(form)}
                >
                    SAVE
                </button>
            </Col>
        </Row>
        <br />
        {/* <section className="nes-container with-title">
            <h2 className="title">teste</h2>
        </section> */}
        <Row>
            <Col mdOffset={1} lgOffset={1} md={10} lg={10} className="field">
                <CelList items={tasks} onDeleteItem={deleteTask} />
            </Col>
        </Row>
    </>
))
