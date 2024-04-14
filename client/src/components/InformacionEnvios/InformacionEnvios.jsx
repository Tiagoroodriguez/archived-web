import './InformacionEnvios.css';

export function InformacionEnvios() {
    return(
        <>
        <section>
            <div className="info-container">
                <div className="info celu">
                    <i className="bi bi-box-seam"></i>
                    <p>Envios a todo el país</p>
                </div>
                <div className="linea"></div>
                <div className="info">
                    <i className="bi bi-credit-card"></i>
                    <p>Paga con tarjeta de debito o credito</p>
                </div>
                <div className="linea"></div>
                <div className="info">
                    <i className="bi bi-lock"></i>
                    <p>Compra con seguridad</p>
                </div>
            </div>
        </section>
        </>
    )
}