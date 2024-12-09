import React, { useState } from "react";
import './SelectTimeDay.css';

function SelectTimeDay() {
  const [days, setDays] = useState([
    { id: 1, name: "Seg", start: "00:00", end: "00:00", enabled: false },
    { id: 2, name: "Ter", start: "00:00", end: "00:00", enabled: false },
    { id: 3, name: "Qua", start: "00:00", end: "00:00", enabled: false },
    { id: 4, name: "Qui", start: "00:00", end: "00:00", enabled: false },
    { id: 5, name: "Sex", start: "00:00", end: "00:00", enabled: false },
  ]);

  const [additionalDays, setAdditionalDays] = useState([
    { id: 6, name: "Sáb", start: "00:00", end: "00:00", enabled: false },
    { id: 7, name: "Dom", start: "00:00", end: "00:00", enabled: false },
  ]);

  const [isDayAdded, setIsDayAdded] = useState(false);
  const [isOpen, setIsOpen] = useState(true);  // Novo estado para controlar a visibilidade do popup

  const toggleDay = (id) => {
    setDays(
      days.map((day) =>
        day.id === id ? { ...day, enabled: !day.enabled } : day
      )
    );
  };

  const updateTime = (id, field, value) => {
    setDays(
      days.map((day) =>
        day.id === id ? { ...day, [field]: value } : day
      )
    );
  };

  const addDay = () => {
    if (additionalDays.length > 0) {
      const nextDay = additionalDays[0];
      setDays([...days, nextDay]);
      setAdditionalDays(additionalDays.slice(1));
      setIsDayAdded(true);
    }
  };

  const removeDay = (id) => {
    setDays(days.filter((day) => day.id !== id));
    const removedDay = days.find((day) => day.id === id);
    if (removedDay) {
      setAdditionalDays([...additionalDays, removedDay].sort((a, b) => a.id - b.id));
    }
  };

  const handleClose = () => {
    setIsOpen(false); // Fecha o popup ao clicar em "Fechar"
  };

  const handleSave = () => {
    // Aqui você pode salvar os dados (por exemplo, enviar para o servidor)
    console.log("Horários salvos:", days);

    // Após salvar, se quiser fechar o popup automaticamente, descomente a linha abaixo:
    // setIsOpen(false);
  };

  return (
    isOpen && ( // Exibe o popup somente se isOpen for true
      <div className="popup-overlay">
        <div className="popup-welcome">
          <div className="popup-left">
            <img
              src="mercadoFacilLogoCirculo.png"
              alt="Mercado Fácil"
              className="popup-logo2"
              style={{ marginTop: isDayAdded ? "120px" : "80px" }}
            />
          </div>
          <div className="popup-right">
            <h3 className="titulo-right">Horário Comercial</h3>
            <div className="schedule-container">
              {days.map((day) => (
                <div key={day.id} className="schedule-row">
                  <input
                    type="checkbox"
                    checked={day.enabled}
                    onChange={() => toggleDay(day.id)}
                  />
                  <span>{day.name}</span>
                  <input
                    type="time"
                    value={day.start}
                    onChange={(e) => updateTime(day.id, "start", e.target.value)}
                    disabled={!day.enabled}
                  />
                  <input
                    type="time"
                    value={day.end}
                    onChange={(e) => updateTime(day.id, "end", e.target.value)}
                    disabled={!day.enabled}
                  />
                  {(day.id === 6 || day.id === 7) && (
                    <button onClick={() => removeDay(day.id)}>
                      <i className="bi bi-trash3"></i>
                    </button>
                  )}
                </div>
              ))}
              {additionalDays.length > 0 && (
                <button className="add-day-button" onClick={addDay}>
                  + Adicionar dia
                </button>
              )}
            </div>
            <div className="action-buttons">
              <button className="popup-button cancel" onClick={handleClose}>
                Fechar
              </button>
              <button className="popup-button save" onClick={handleSave}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default SelectTimeDay;
