import "./styles/CategoryCard.css";

type Props = { title: string; description: string; icon: string; id: Number; };

const CategoryCard = ({ title, description, icon, id }: Props) => {
    return (
        <a href={"/collection/" + id}>
            <li className="category-card">

                <span className="category-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{description}</p>

            </li>
        </a>
    );
};
export default CategoryCard;
