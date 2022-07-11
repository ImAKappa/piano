<script lang="ts">
    import { onMount } from 'svelte';
    import * as Tone from 'tone';

    let sampler: Tone.Sampler;
    onMount(() => {
        sampler = new Tone.Sampler({
            urls: {
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();

    })

    let quizActive: boolean = true;
    let quizCurrentNote: string = 'C';

    type Key = {
        note: string;
        enharmonicNote?: string;
        isBlack: boolean;
    }

    let keys: Key[] = [
        {note: 'B#', enharmonicNote: 'C', isBlack: false},
        {note: 'C#', enharmonicNote: 'Db', isBlack: true},
        {note: 'D', isBlack: false},
        {note: 'D#', enharmonicNote: 'Eb', isBlack: true},
        {note: 'Fb', enharmonicNote: 'E', isBlack: false},
        {note: 'E#', enharmonicNote: 'F', isBlack: false},
        {note: 'F#', enharmonicNote: 'Gb', isBlack: true},
        {note: 'G', isBlack: false},
        {note: 'G#', enharmonicNote: 'Ab', isBlack: true},
        {note: 'A', isBlack: false},
        {note: 'A#', enharmonicNote: 'Bb', isBlack: true},
        {note: 'Cb', enharmonicNote: 'B', isBlack: false},
    ];

    const playNote = async (event: Event) => {
        const note = (event.target as HTMLButtonElement).innerText;
        sampler.triggerAttackRelease(`${note}4`, '8n');
        console.log(note);
        return;
    }

    /**
     * Start at NOT fully implemented yet
     * @param startNote
     */
    // const newTwelveToneScale = (startNote: string = 'C'): Key[] => {
    //     if (startNote.length > 1) throw Error(`${startNote} is too long! Enter a single starting note`);
    //     startNote = startNote.toUpperCase();
    //     const notes = new Set(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    //     if (!notes.has(startNote)) throw Error(`${startNote} is not a valid starting note for 12-tone scale!`);

    //     let twelveToneScale: string[] = [];
    //     for (let note of notes) {
    //         twelveToneScale = [ ...twelveToneScale, `${note}b`, note, `${note}#`,];
    //     }
    //     console.info(twelveToneScale);
    //     return twelveToneScale
    // }

    // let keys = newTwelveToneScale();

    const randNote = () => {
        const randKey: Key = keys[Math.floor(Math.random() * keys.length)];
        quizCurrentNote = randKey.enharmonicNote ?? randKey.note;
        return;
    }

    const checkNote = (event: Event): boolean => {
        const note = (event.target as HTMLButtonElement).innerText;
        console.log(`${note} == ${quizCurrentNote}!`, note === quizCurrentNote ? 'Correct' : 'Incorrect');
        return note === quizCurrentNote;
    }

    let resetButton = false;

    const pressKey = (e: Event) => {
        playNote(e);
        if (checkNote(e)) {
            resetButton = !resetButton;
            randNote();
        } else {
            (e.target as HTMLButtonElement).classList.remove('bg-black');
            (e.target as HTMLButtonElement).classList.remove('bg-white');

            (e.target as HTMLButtonElement).classList.add('bg-red-500');
            console.log('Try again!');
        }
    }
</script>

<!-- Piano -->
<div class="pt-2 px-6 bg-black flex flex-col itmes-center">
    <!-- Quiz controls -->
    <div class="flex flex-col items-center m-2 p-2">
        <p class="text-white bg-blue-700 py-2 px-6">{quizCurrentNote} <span class="">👋</span></p>
        <button on:click={() => {quizActive = !quizActive;}} class="bg-slate-800 text-white p-2 m-2">Toggle notes</button>
    </div>

    <!-- Keys -->
    <div class="flex flex-row items-start">
    {#each keys as key}
        {#key resetButton}
        <button on:click={pressKey}
            class="flex flex-col transition duration-500 items-center justify-end hover:bg-sky-700 {key.isBlack ? 'bg-black text-white h-32 -mx-4 z-10 w-8' : 'bg-white text-black h-48 w-10'} border-2 border-slate-500  p-1">
            <span class="transition-opacity duration-200 {!quizActive ? 'opacity-100' : 'opacity-0'} text-center pointer-events-none">{key.enharmonicNote ?? key.note}</span>
        </button>
        {/key}
    {/each}
    </div>
</div>