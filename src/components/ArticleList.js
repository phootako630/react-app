import {Link} from "react-router-dom";

const ArticleList = ({articles}) => {
    return (
        <>
            {articles.map(atc => (
                <Link key={atc.name} className="article-list-item" to={`/articles/${atc.name}`}>
                    <h3>{atc.title}</h3>
                    <p>{atc.content[0].substring(0, 150)}...</p>
                </Link>

            ) ) }</>
    )

}
export default ArticleList;