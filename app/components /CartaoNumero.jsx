export default function CartaoNumero({titulo, valor}){
    return (
        <div className="cartao-numero">
            <strong>{valor}</strong>
            <span>{titulo}</span>

        </div>
    )
}