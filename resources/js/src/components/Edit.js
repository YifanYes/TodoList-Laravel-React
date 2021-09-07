import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContainer from './AppContainer.js';
import api from "../api.js"

const Edit = () => {
    const {id} = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            console.log(JSON.stringify({ "title": title, "description": description }));
            await api.updateTask({
                title, description
            }, id);
            history.push('/');
        } catch {
            alert('Failed to edit new task')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        api.getOneTask(id).then(resp =>{
            const result = resp.data;
            const task = result.data;
            setTitle(task.title);
            setDescription(task.description);
        })
    }, []);

    return(
        <AppContainer title="EDIT TASK">
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                    className="form-control" 
                    type="text" 
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
                    onClick={onEditSubmit}
                    disabled={loading}
                    >
                        {loading ? 'LOADING...' : 'EDIT'}
                    </button>
                </div>
            </form>

        </AppContainer>
    );
};

export default Edit;
