import { ClipLoader } from "react-spinners"

export default function Loading({ notFullPage = false }) {
    return (
        <div
            className={`flex justify-center ${
                notFullPage
                    ? "mt-16 mb-16"
                    : "items-center min-h-screen"
            }`}
        >
            <ClipLoader color="#f97316" size={50} />
        </div>
    )
}