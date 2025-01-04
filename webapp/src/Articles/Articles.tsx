import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import "./Article.css";
import './ArticleCard.css';
import { Article } from "../Main";

export function Articles({ admin }: { admin?: boolean }) {
    const { data: articles, isLoading, error } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:4000/articles');
            return response.data;
        }
    }
    );
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching articles: {(error as Error).message}</div>;
    }
    return (
        <div>
            <div className="article-list">
                {articles.map((article: Article) => (
                    <div className="article-item" key={article._id}>
                        <Link to={`/articles/${article._id}`} style={{ color: "grey" }}>{article.title}</Link>
                        <div className="dropdown-container">
                            {admin && <p>Id: {article._id}</p>}
                            {admin && (
                                <div className="dropdown">
                                    <button className="dropdown-button">...</button>
                                    <div className="dropdown-menu">
                                        <button className="dropdown-item">Edit</button>
                                        <button className="dropdown-item">Delete</button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export function ArticleCard() {
    const { id } = useParams();

    const { data: article, isLoading, error } = useQuery({
        queryKey: ['articles', id],
        queryFn: async ({ queryKey }) => {
            const [, id] = queryKey;
            const response = await axios.get(`http://localhost:4000/articles/${id}`);
            return response.data;
        },
        enabled: !!id
    }
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching articles: {(error as Error).message}</div>;
    }


    if (!article) {
        return <div>Article not found.</div>;
    }

    return (
        <div>
            <div className="article-detail">
                <h1>{article.title}</h1>
                <p>{article.content}</p>
                <div className="article-meta">
                    Article ID: {id} | Published on: 2023-01-01
                </div>
            </div>
        </div>
    );
}