export default function EmptyState({
    icon = "fa-box-open",
    title = "Nothing here yet",
    message = "There is no data to display.",
    actionText,
    onAction
}) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4">

            <i className={`fa-solid ${icon} text-5xl text-zinc-300 mb-4`}></i>

            <h3 className="text-lg font-semibold text-zinc-700">
                {title}
            </h3>

            <p className="text-sm text-zinc-500 mt-2 max-w-sm">
                {message}
            </p>

            {actionText && (
                <button
                    onClick={onAction}
                    className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
                >
                    {actionText}
                </button>
            )}

        </div>
    )
}