import React, { useEffect, useState } from 'react';
import  './estadiscas.css'


const Estadisticas = () => {
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        // Llamar a la API para obtener la lista de PDFs
        fetch('http://localhost:3001/api/estadisticas') // Cambia la URL según tu API
            .then(response => response.json())
            .then(data => setPdfs(data))
            .catch(error => console.error('Error al cargar los PDFs:', error));
    }, []);

    return (
        <div>
        
            
            {/* Lista de PDFs */}
            {pdfs.map(pdf => (
                <div key={pdf.id} style={{ marginBottom: '20px' }}>
                
                    <iframe
                        src={`http://localhost:3001/${pdf.ubicacion}`} // Cambia la URL base según tu servidor
                        title={`PDF-${pdf.id}`}
                        width="100%"
                        height="640px"
                        style={{ border: '1px solid #ccc', borderRadius: '8px' }}
                    ></iframe>
                </div>
            ))}
        </div>
    );
};

export default Estadisticas;
