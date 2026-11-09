import { useEffect, useState } from "react";
import useSWR from "swr";
import { getPhoto } from "../../api";
import { FaTimes } from "react-icons/fa";

type ProofModalProps = {
    id: number | null;
    onClose: () => void;
};

function ProofModal({ id, onClose }: ProofModalProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const {
        data: blob,
        error,
        isLoading,
    } = useSWR<Blob, Error>(id ? `/attendance/${id}/photo` : null, getPhoto, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
    });

    useEffect(() => {
        if (!blob) {
            (() => setImageUrl(null))();
            return;
        }
        const url = URL.createObjectURL(blob);
        (() => setImageUrl(url))();
        return () => URL.revokeObjectURL(url);
    }, [blob]);

    useEffect(() => {
        if (id === null) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [id, onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div
                className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <button onClick={onClose} className="cursor-pointer" aria-label="Close">
                        <FaTimes />
                    </button>
                </div>
                <div className="p-4 flex items-center justify-center min-h-48">
                    {isLoading && <p className="text-sm text-gray-500">Loading image...</p>}
                    {error && <p className="text-sm text-red-600">{error.message}</p>}
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Attendance proof"
                            className="max-w-full max-h-[70vh] rounded"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProofModal;
