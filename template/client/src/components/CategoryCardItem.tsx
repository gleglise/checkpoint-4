import "../pages/styles/Item.css";
type Props = { name: string; description: string; type: string; image_url: string; };

const CategoryCardItem = ({ name, description, type, image_url }: Props) => {
    return (

        <li className="category-card-item">

            <h1>{name}</h1>
            <img src={image_url} alt={name} />
            <p>{description}</p>
            <hr />
            <p>Catégorie : {type}</p>

        </li>
    );
};
export default CategoryCardItem;
