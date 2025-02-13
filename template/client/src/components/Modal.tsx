import React, { useState } from 'react';
import "./styles/Modal.css";

interface FormData {
    name: string;
    icon: string;
    description: string;
}
type typeProps = {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ isActive, setIsActive }: typeProps) => {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        icon: '',
        description: ''
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const fetchCreateCollections = async () => {
        try {
            const response = await fetch("http://localhost:3310/api/collections/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    icon: formData.icon,
                    name: formData.name,
                    description: formData.description,
                    // user_id: formData.user_id
                    user_id: 1
                })
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la création de la collections");
            }
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message); // Stocke l'erreur si la requête échoue
            } else {
                console.error(err); // Stocke l'erreur si la requête échoue
            }
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form Submitted', formData);
        fetchCreateCollections();
    };

    const handleClick = () => {
        setIsActive(!isActive);
    }



    return (
        <section className={`form-collection ${isActive ? 'toggle' : ''}`}>
            <div className='icone-close'>
                <h1>create your collection</h1>
                <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='input-name-form'>
                    <label htmlFor="name">Name :</label>
                    <input
                        className='input-form'
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='select-your-icon-form'>
                    <label htmlFor="icon">Select your icon :</label>
                    <select
                        className='select-icon'
                        id="icon"
                        name="icon"
                        value={formData.icon}
                        onChange={handleChange}
                        required
                    >
                        <option value="📚">📚</option>
                        <option value="🎮">🎮</option>
                        <option value="📖">📖</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="description">Description :</label>
                    <textarea
                        className='input-text'
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        cols={50}
                        required
                    />
                </div>

                <button className='button-form-collection' type="submit">Send</button>
            </form>
        </section>


    );
};
export default Modal;
