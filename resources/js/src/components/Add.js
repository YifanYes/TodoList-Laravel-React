import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import AppContainer from './AppContainer.js';
import api from "../api.js"

const Add = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            console.log(JSON.stringify({ "title": title, "description": description }));
            await api.addTask({
                title, description
            })
            history.push('/');
        } catch {
            alert('Failed to add new task')
        } finally {
            setLoading(false);
        }
    };

    return(
        <AppContainer title="ADD TASK">
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                    className="form-control" 
                    type="text" 
                    placeholder="What are we doing today?"
                    id="title"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                    className="form-control" 
                    placeholder="Add some description"
                    id="description"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="form-group">
                    <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={onAddSubmit}
                    disabled={loading}
                    >
                        {loading ? 'LOADING...' : 'ADD'}
                    </button>
                </div>
            </form>

        </AppContainer>
    );
};

export default Add;
