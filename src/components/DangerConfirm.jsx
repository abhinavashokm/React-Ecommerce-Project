export default function DangerConfirm({
    message = "Are you sure?",
    onConfirm,
    onCancel
}) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-lg p-6 w-[350px]">

                <h2 className="text-lg font-semibold text-zinc-800">
                    Confirm Action
                </h2>

                <p className="text-sm text-zinc-500 mt-2">
                    {message}
                </p>

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm rounded-lg border border-zinc-300 hover:bg-zinc-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    )
}