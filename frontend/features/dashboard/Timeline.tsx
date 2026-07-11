const steps=[
"File Uploaded",
"Metadata Extraction",
"Hash Calculation",
"Entropy Analysis",
"IOC Detection",
"Risk Engine",
"Analysis Complete",
];

export default function Timeline(){

return(

    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-6 text-xl font-semibold">
        Analysis Timeline
        </h2>
        <div className="space-y-4">
        {steps.map((step,index)=>(

        <div
            key={step}
            className="flex items-center gap-4"
            >
            <div className="h-3 w-3 rounded-full bg-emerald-500"/>
                <p>
                    {step}
                </p>
            </div>
            ))}

        </div>
    </div>

);

}