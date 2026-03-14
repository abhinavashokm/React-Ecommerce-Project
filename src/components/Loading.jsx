import { ClipLoader } from "react-spinners"

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <ClipLoader color="#f97316" size={50} />
        </div>
    )
}