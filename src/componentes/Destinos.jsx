import React, { useState } from 'react';
import './Destinos.css';

// IMPORTA AQUÍ TUS IMÁGENES REALES
import img1 from './Imagenes/maps/Hospedaje.png';
import img2 from './Imagenes/maps/Hospedaje.png';
import img3 from './Imagenes/maps/Hospedaje.png';
import img4 from './Imagenes/maps/Hospedaje.png';
import img5 from './Imagenes/maps/Hospedaje.png';
import img6 from './Imagenes/maps/Hospedaje.png';

const DESTINOS = [
  { id: 1, title: 'Cenote Samulá', tel: '(985) 123 4567', image: img1, desc: 'Cenote famoso por su bóveda y agua cristalina.' },
  { id: 2, title: 'Cenote Xkeken', tel: '(985) 234 5678', image: img2, desc: 'Cueva subterránea con iluminación natural.' },
  { id: 3, title: 'Calzada de los Frailes', tel: '(985) 345 6789', image: img3, desc: 'Calle colonial con tiendas y cafés.' },
  { id: 4, title: 'Convento de San Bernardino', tel: '(985) 456 7890', image: img4, desc: 'Convento histórico con espectáculos nocturnos.' },
  { id: 5, title: 'Iglesia de San Servacio', tel: '(985) 567 8901', image: img5, desc: 'Iglesia en el corazón de Valladolid.' },
  { id: 6, title: 'Cenote Oxmán', tel: '(985) 678 9012', image: img6, desc: 'Cenote abierto con soga para lanzarse.' }
];

export default function Destino() {
  const [selected, setSelected] = useState(null);

  const next = () => {
    setSelected((prev) => (prev % DESTINOS.length) + 1);
  };

  const prev = () => {
    setSelected((prev) => (prev - 2 + DESTINOS.length) % DESTINOS.length + 1);
  };

  const destinoActual = DESTINOS.find(d => d.id === selected);

  return (
    <div>
      <div className="Separacion"></div>

      {/* GALERÍA */}
      <div className="destino-galeria">
        {DESTINOS.map(dest => (
          <div key={dest.id} className="destino-item" onClick={() => setSelected(dest.id)}>
            <img src={dest.image} alt={dest.title} className="destino-img" />
            <div className="destino-info">
              <h3>{dest.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            {/* Imagen grande */}
            <img src={destinoActual.image} alt={destinoActual.title} className="modal-img" />

            {/* Información */}
            <div className="modal-info">
              <h2>{destinoActual.title}</h2>
              <p>{destinoActual.desc}</p>
              <p className="modal-tel">📞 {destinoActual.tel}</p>
            </div>

            {/* Controles */}
            <button className="btn-prev" onClick={prev}>←</button>
            <button className="btn-next" onClick={next}>→</button>

             {/* Cerrar */}
            <button className="btn-close" onClick={() => setSelected(null)}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
}
