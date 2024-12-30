import { useState } from "react";
import { Article } from "../Main";
import './CreateArticle.css';
import axios from "axios";
import { Articles } from "../Articles/Articles";

export function AdminPanel() {


    const [isCreating, setIsCreating] = useState(false);
    const handleCreateClick = () => setIsCreating(true);
    const handleFormSubmit = (article: Article) => {
        // handle post here
        setIsCreating(false);
    };


    return (
        <div>
            <div style={{ display: "flex" }}>
                <h3 style={{ paddingLeft: '10px' }}>Admin dashboard</h3>
                <button onClick={handleCreateClick} className="create-button">
                    Create
                </button>
            </div>
            <Articles admin={true} />
            <div>
                {isCreating && <ArticleModal onSubmit={handleFormSubmit} onClose={() => setIsCreating(false)} />}
            </div>
        </div>
    )
}
interface ArticleFormProps {
    onSubmit: (article: Article) => void;
    onClose: () => void;
}

function ArticleForm({ onSubmit, onClose }: ArticleFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newArticle: Article = {
            id: Date.now(),
            title,
            content,
        };
        onSubmit(newArticle);
    };

    return (
        <form onSubmit={handleSubmit} className="article-form">
            <h2>Create Article</h2>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
        </form>

    );
}

function ArticleModal({ onSubmit, onClose }: ArticleFormProps) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="article-form-overlay"
                onClick={(e) => e.stopPropagation()}
            >
                <ArticleForm onSubmit={onSubmit} onClose={onClose} />
            </div>
        </div>
    );
}