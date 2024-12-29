import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import "./Article.css";
import './ArticleCard.css';
import { Article } from "../Main";

export function Articles() {
    const { data: articles, isLoading, error } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:4000/articles');
            return response.data;
        }
    }
    );



    return (
        <div>
            {(isLoading || error) && isLoadingOrError(isLoading, error)}
            {(!isLoading || !error) && <div className="article-list">
                {articles.map((article: Article) => (
                    <div className="article-item" key={article.id}>
                        <Link to={`/articles/${article.id}`} style={{ color: "grey" }}>{article.title}</Link>
                    </div>
                ))}
            </div>}
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



    if (!article) {
        return <div>Article not found.</div>;
    }

    return (
        <div>
            {(isLoading || error) && isLoadingOrError(isLoading, error)}
            {(!isLoading || !error) && <div className="article-detail">
                <h1>{article.title}</h1>
                <p>{article.content}</p>
                <div className="article-meta">
                    Article ID: {id} | Published on: 2023-01-01
                </div>
            </div>}
        </div>
    );
}

function isLoadingOrError(isLoading: boolean, error: Error | null) {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching articles: {(error as Error).message}</div>;
    }
}