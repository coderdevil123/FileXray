import { LoaderCircle } from "lucide-react";

export default function LoadingOverlay(){

return(

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

        <div className="rounded-xl bg-zinc-900 p-8 text-center">

            <LoaderCircle
                size={48}
                className="mx-auto animate-spin text-emerald-500"
            />

            <p className="mt-6 text-lg font-semibold">
                Analyzing File...
            </p>

            <p className="text-zinc-400">
                Please wait.
            </p>

        </div>

    </div>

    );

}