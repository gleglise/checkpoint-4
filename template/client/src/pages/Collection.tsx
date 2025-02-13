// import "./styles/Home.css";
import CategoryCardItem from "../components/CategoryCardItem";
import "./styles/Item.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Item = {
    id: number,
    collection_id: number,
    name: string,
    type: string,
    description: string,
    image_url: string,
    created_at: string
}



const Collection = () => {

    const { id } = useParams();
    const [items, setItems] = useState<Item[]>([]); // État pour stocker les collections

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("http://localhost:3310/api/items/readAll?collectionId=" + id); // URL de ton API
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des collections");
                }
                const data = await response.json();
                setItems(data); // Mise à jour de l'état avec les données récupérées
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err.message); // Stocke l'erreur si la requête échoue
                } else {
                    console.error(err); // Stocke l'erreur si la requête échoue
                }
            }
        };

        fetchItems(); // Appel de la fonction pour récupérer les collections
    }, []);

    return (
        <main className="collection">
            <div className="categories">
                <ul key={id} data-key={id} className="categories-content">
                    {items.map((item) => (
                        // <p>{item.name}</p>
                        <CategoryCardItem name={item.name} description={item.description} type={item.type} key={item.id} image_url={item.image_url} />
                    ))}
                </ul>

                <div title="Créer un item" className="buttonAdd" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                </div>
            </div>
        </main>
    );
};
export default Collection;
