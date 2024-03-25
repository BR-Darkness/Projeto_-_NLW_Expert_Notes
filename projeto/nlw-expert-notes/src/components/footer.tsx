export function Footer() {
    return (
        <footer className="w-full p-4 bg-slate-700 border-t-2 border-slate-600 bottom-0 flex flex-wrap gap-x-48 gap-y-2 items-center justify-evenly">
            <p className="text-sm font-medium text-slate-200">Projeto de estudos - NLW Expert</p>
            <p className="text-sm font-medium text-slate-200">
                <b>GitHub:</b> 
                <a 
                    className="rounded-sm text-lime-400 p-1 mx-1 outline-none hover:text-lime-500 focus-visible:text-lime-400 focus-visible:ring-1 focus-visible:ring-lime-400" 
                    href="https://github.com/BR-Darkness"
                    target="_blank"
                >
                    BR-Darkness
                </a>
            </p>
        </footer>
    )
}