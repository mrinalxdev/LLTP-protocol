import notesView from "./notesView.js"

const app = document.getElementById('app')
const view = new notesView(app, {
    onNoteAdd() {
        console.log('Note has been selected!')
    },
    onNoteEdit(newTitle, newBody){
        console.log(newTitle)
        console.log(newBody)
    },
})