import React, { useEffect, useState } from 'react';
import  './estadiscas.css'


const Estadisticas = () => {
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        // Llamar a la API para obtener la lista de PDFs
        fetch('https://eventos-valladolid-backendt.onrender.com/api/estadisticas') // Cambia la URL según tu API
            .then(response => response.json())
            .then(data => setPdfs(data))
            .catch(error => console.error('Error al cargar los PDFs:', error));
    }, []);

    return (
        <div>
            <div className='Separacion'>
            </div>
            
            {/* Lista de PDFs */}
            {pdfs.map(pdf => (
                <div key={pdf.id} style={{ marginBottom: '20px' }}>

                    <h2 className='titel1' style={{ textAlign: 'center' }}>{pdf.titulo}</h2>
                
                    <iframe
                        src={`https://eventos-valladolid-backendt.onrender.com/${pdf.ubicacion}#zoom=page-fit`}
                        title={`PDF-${pdf.id}`}
                        width="80%"
                        height="600px"
                        style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                    ></iframe>


                </div>
            ))}
        </div>
    );
};

export default Estadisticas;
