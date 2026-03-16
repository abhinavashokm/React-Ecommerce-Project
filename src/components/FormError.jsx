export default function FormError({ msg }){
    return (
        <p className="text-sm text-red-500 mt-1">
            {msg}
        </p>
    )
}