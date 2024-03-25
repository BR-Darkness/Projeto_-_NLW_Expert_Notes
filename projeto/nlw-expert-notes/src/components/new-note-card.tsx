import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner';

interface NewNoteCardProps {
    onNoteCreated: (content: string) => void
}

let SpeechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [content, setContent] = useState('');

    function handleStartEditor() {
        setShouldShowOnboarding(false);
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);

        if(event.target.value === '') {
            setShouldShowOnboarding(true);
        }
    }

    function handleSaveNote(event: FormEvent) {
        event.preventDefault();

        if(content === '') {return}

        onNoteCreated(content);
        setContent('');
        setShouldShowOnboarding(true);
        toast.success('Nota criada com sucesso!')
    }

    function handleStartRecording() {
        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

        if (!isSpeechRecognitionAPIAvailable) {
            alert('Infelizmente seu navegador não suporta a API de gravação!');
            return
        }

        setIsRecording(true);
        setShouldShowOnboarding(false);

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

        SpeechRecognition = new SpeechRecognitionAPI();

        SpeechRecognition.lang = 'pt-BR';
        SpeechRecognition.continuous = true;
        SpeechRecognition.maxAlternatives = 1;
        SpeechRecognition.interimResults = true;

        SpeechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript)
            }, '');

            setContent(transcription);
        }

        SpeechRecognition.onerror = (event) => {
            console.log(event);
        }

        SpeechRecognition.start();
    }

    function handleStopRecording() {
        setIsRecording(false);

        if(SpeechRecognition != null) {
            SpeechRecognition.stop();
        }
    }

    return ( 
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 text-left p-5 gap-3 outline-none hover:ring-1 hover:ring-slate-600 focus-visible:ring-1 focus-visible:ring-lime-400">
                <span className="text-sm font-medium text-slate-200">
                    Adicionar nota
                </span>
                <p className="text-sm leading-6 text-slate-400">
                    Grave uma nota em áudio que será convertida para texto automaticamente.
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/75 flex justify-center items-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <Dialog.DialogContent className="fixed overflow-hidden w-full min-[660px]:max-w-[640px] h-full min-[660px]:h-[60vh] bg-slate-700 min-[660px]:rounded-md flex flex-col outline-none ring-1 ring-slate-700 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                        <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-2 text-slate-400 hover:text-slate-100 rounded-bl-md outline-none focus-visible:ring-1 focus-visible:ring-lime-400">
                            <X className="size-5" />
                        </Dialog.Close>

                        <form className="flex-1 flex flex-col">
                            <div className="flex flex-1 flex-col gap-3 p-5">
                                <span className="text-sm font-medium text-slate-300">
                                    Adicionar nota
                                </span>
                                
                                {shouldShowOnboarding ? (
                                    <p className="text-sm leading-6 text-slate-400">
                                        Comece <button type="button" onClick={handleStartRecording} className="font-medium text-lime-400 hover:underline outline-none focus-visible:ring-1 focus-visible:ring-lime-400 rounded-sm">gravando uma nota</button> em áudio ou se preferir <button type="button" onClick={handleStartEditor} className="font-medium text-lime-400 hover:underline outline-none focus-visible:ring-1 focus-visible:ring-lime-400 rounded-sm">utilize apenas texto</button>.
                                    </p>
                                ) : (
                                    <textarea autoFocus 
                                        className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none" 
                                        onChange={handleContentChanged}
                                        value={content}
                                    />
                                )}
                            </div>

                            {isRecording ? (
                                <button type="button" onClick={handleStopRecording} className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100">
                                    <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                                    Gravando! (clique p/ interromper)
                                </button>
                            ) : (
                                <button type="button" onClick={handleSaveNote} disabled={!content} className={`disabled:bg-lime-900 disabled:cursor-not-allowed w-full bg-lime-400 py-4 text-center text-sm text-lime-950 font-medium hover:bg-lime-500 outline-none focus-visible:bg-lime-500`}>
                                    Salvar nota
                                </button>
                            )}
                        </form>
                    </Dialog.DialogContent>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}