import { AdminPanel } from "./admin/AdminPanel";
import "./Article.css";
import './ArticleCard.css';
import { Routes, Route, Link, useParams } from "react-router";

const articles = [
    {
        id: 1,
        title: 'First article',
        content: 'Some article text here.Some article text here.Some article text here'
    }, {
        id: 2,
        title: 'Second article',
        content: 'Working on a project'
    }
]
export interface Article {
    id: number;
    title: string;
    content: string;
}

export interface ArticlesProps {
    articles: Article[];
}

export function Main() {
    return (
        <Routes>
            <Route path="/" element={<Articles articles={articles} />} />
            <Route path="/articles/:id" element={<ArticleCard articles={articles} />} />
            <Route path="/admin" element={<AdminPanel articles={articles} />} />
        </Routes>
    )
}

function Articles({ articles }: ArticlesProps) {
    return (
        <div className="article-list">
            {articles.map((article) => (
                <div className="article-item" key={article.id}>
                    <Link to={`/articles/${article.id}`} style={{ color: "grey" }}>{article.title}</Link>
                </div>
            ))}
        </div>
    )
}

function ArticleCard({ articles }: ArticlesProps) {
    const { id } = useParams();

    const article = articles.find((art) => art.id === Number(id));

    if (!article) {
        return <div>Article not found.</div>;
    }

    return (
        <div className="article-detail">
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <div className="article-meta">
                Article ID: {id} | Published on: 2023-01-01
            </div>
        </div>
    );
}

