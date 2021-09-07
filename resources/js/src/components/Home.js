import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import AppContainer from './AppContainer.js';
import api from "../api.js";

const Home = () => {
    const [tasks, setTasks] =useState(null);

    const fetchTasks = () => {
        api.getAllTasks().then(resp => {
            const result = resp.data;
            setTasks(result.data)
        })
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const renderTasks = () => {
        if(!tasks){
            return(
                <tr>
                    <td colSpan="4">
                        Loading tasks...
                    </td>  
                </tr>
            )
        }
        if(tasks.length === 0){
            return(
                <tr>
                    <td colSpan="4">
                        There is no tasks yet.
                    </td>  
                </tr>
            )
        }

        return tasks.map((task, index) => (
            <tr key={index.toString()}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                    <Link 
                    type="button"
                    className="btn btn-warning"
                    to={`/edit/${task.id}`}
                    >
                        EDIT
                    </Link>
                    <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                        api.deleteTask(task.id)
                        .then(fetchTasks)
                        .catch(err => {
                            alert('Failed to delete task with id:' + task.id);
                        });
                    }}
                    >
                        DELETE
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <AppContainer
            title = "To Do List"
        >
            <Link to ="/add" className="btn btn-primary">Add Task</Link>
            <div className="table-responsive">
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTasks()}
                    </tbody>
                </table>
            </div>
        </AppContainer>
    );
};

export default Home;
