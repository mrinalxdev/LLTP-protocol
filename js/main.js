import notesView from "./notesView.js"
import notesAPI from "./notesAPI.js"

const app = document.getElementById('app')
const view = new notesView(app, {
    onNoteAdd() {
        console.log('Note has been selected!')
    },
    onNoteSelect(id){
        console.log("Note Selected" + id)
    },
    onNoteEdit(newTitle, newBody){
        console.log(newTitle)
        console.log(newBody)
    },
    onNoteDelete(id){
        console.log("Notes Deleted" + id)
    }
})


view.updateNoteList(notesAPI.getAllNotes())