import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { ptBR } from 'date-fns/locale/pt-BR';
import { X } from 'lucide-react'

interface NoteCardProps {
    note: {
        id: string;
        date: Date;
        content: String;
    }
    onNoteDeleted: (id: string) => void;
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md text-left flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-1 hover:ring-slate-600 focus-visible:ring-1 focus-visible:ring-lime-400">
                <span className="text-sm font-medium text-slate-300">
                    {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true})}
                </span>
                <pre className="font-sans text-sm leading-6 text-slate-400 text-wrap pt-2">
                    {note.content}
                </pre>

                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/75 flex justify-center items-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <Dialog.DialogContent className="fixed overflow-hidden w-full min-[660px]:max-w-[640px] h-full min-[660px]:h-[60vh] bg-slate-700 min-[660px]:rounded-md flex flex-col outline-none ring-1 ring-slate-700 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                        <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-2 text-slate-400 hover:text-slate-100 rounded-bl-md outline-none focus-visible:ring-1 focus-visible:ring-lime-400">
                            <X className="size-5" />
                        </Dialog.Close>

                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className="text-sm font-medium text-slate-300">
                                {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
                            </span>
                            <pre className="font-sans text-sm leading-6 text-slate-400 text-wrap">
                                {note.content}
                            </pre>
                        </div>

                        <button 
                            type="button" 
                            onClick={() => onNoteDeleted(note.id)}
                            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none rounded-sm font-medium group">
                            Deseja <span className="text-red-400 group-hover:underline group-focus-visible:underline">apagar essa nota</span>?
                        </button>
                    </Dialog.DialogContent>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}