import "./Article.css";

const articles = [
    {
        id: 1,
        text: 'Some article text here.Some article text here.Some article text here'
    }, {
        id: 2,
        text: 'Working on a project'
    }
]

export function Articles() {
    return (

        <div className="article-list">
            {articles.map((art) => (
                <div className="article-item" key={art.id}>
                    {art.text}
                </div>
            ))}
        </div>
    )
}