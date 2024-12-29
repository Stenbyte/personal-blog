import { useState } from "react";
import { Article } from "../Main";
import './CreateArticle.css';

export function AdminPanel() {
    // const [isCreating, setIsCreating] = useState(false);
    // const handleCreateClick = () => setIsCreating(true);
    // const handleFormSubmit = (article: Article) => {
    //     articles.push(article);
    //     setIsCreating(false);
    // };

    // return (
    //     <div>
    //         <div style={{ display: "flex" }}>
    //             <h1>Article List</h1>
    //             <button onClick={handleCreateClick} className="create-button">
    //                 Create
    //             </button>
    //         </div>
    //         <div style={{ display: "flex" }}>
    //             <div className="list">
    //                 {articles.map((article) => (
    //                     <div key={article.id} className="article">
    //                         <h2>{article.title}</h2>
    //                         <p>{article.content}</p>
    //                     </div>
    //                 ))}
    //             </div>
    //             {isCreating && <ArticleForm onSubmit={handleFormSubmit} />}
    //         </div>
    //     </div>
    // )
}
interface ArticleFormProps {
    onSubmit: (article: Article) => void;
}

// function ArticleForm({ onSubmit }: ArticleFormProps) {
//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const newArticle: Article = {
//             id: Date.now(),
//             title,
//             content,
//         };
//         onSubmit(newArticle);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="article-form">
//             <h2>Create Article</h2>
//             <div>
//                 <label>
//                     Title:
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Content:
//                     <textarea
//                         value={content}
//                         onChange={(e) => setContent(e.target.value)}
//                     />
//                 </label>
//             </div>
//             <button type="submit" className="submit-button">
//                 Submit
//             </button>
//         </form>
//     );
// }