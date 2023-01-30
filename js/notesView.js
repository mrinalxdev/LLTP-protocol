export default class notesView {
    constructor (root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root 
        this.onNoteSelect = onNoteSelect 
        this.onNoteAdd =  onNoteAdd
        this.onNoteEdit = onNoteEdit
        this.onNoteDelete = onNoteDelete

        this.root.innerHTML = `
        
        <div class="notes__sidebar">
            <button class="notes__add" type="button">Add Notes</button>

            <div class="notes__list">
                <div class="notes__list-item notes__list-item--selected"></div>
            </div>
        </div>
        <div class="notes__preview">
            <input type="text" class="notes__title" placeholder="Enter your title...">
            <textarea class="notes__body">Add Your Important Notes here ... </textarea>
        </div>
        `

        const btnAddNote = this.root.querySelector(".notes__add")
        const inpTitle = this.root.querySelector(".notes__title")
        const inpBody = this.root.querySelector(".notes__body")

        btnAddNote.addEventListener('click', () => {
            this.onNoteAdd()
        })
        console.log(inpTitle)
        console.log(inpBody)
        
        let inputField
        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim()
                const updatedBody = inpBody.value.trim()

                this.onNoteEdit(updatedTitle, updatedBody)
            })
        })




    }

    _createListItemHTML(id, title, body, updated){
        const MAX_BODY_LENGTH = 60

        return `
        
        <div class="notes__list-item" data-note-id="${id}">
            <div class="notes__small-title>${title}</div>
            <div class="notes__small-body>
                ${body.substring(0, MAX_BODY_LENGTH)}
                ${body.length > MAX_BODY_LENGTH ? "...." : ""}
            </div>
            <div class="notes__small-updated>
                ${updated.toLocalString(undefined, {dateStyle: 'full', timeStyle: 'short'})}
            </div>
        </div>
        `
    }
}