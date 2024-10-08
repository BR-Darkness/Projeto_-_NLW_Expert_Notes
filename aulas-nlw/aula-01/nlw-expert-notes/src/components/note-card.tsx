export function NoteCard() {
    return (
    <button className="rounded-md text-left bg-slate-800 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
        Há 2 dias
        </span>
        <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus ea ab libero beatae ullam, nemo iusto eligendi reiciendis maxime minima accusantium eos vel dignissimos iste corporis, est culpa assumenda quos?
        Error expedita sunt ullam, minus itaque quaerat porro voluptatibus, doloremque eum ab ea, sint alias voluptatem tempora voluptas optio laborum nihil. Magnam necessitatibus, ducimus minima non rem tenetur hic natus!
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </button>
    )
}