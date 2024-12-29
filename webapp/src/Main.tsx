
import { AdminPanel } from "./admin/AdminPanel";
import { Routes, Route } from "react-router";
import { ArticleCard, Articles } from "./Articles/Articles";

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
            <Route path="/" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleCard />} />
            {/* <Route path="/admin" element={<AdminPanel />} /> */}
        </Routes>
    )
}



