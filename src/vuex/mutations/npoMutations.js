export default {
    // READ NPOs
    fetchingNPOs(state) {
        state.fetchNPOsError = false
        state.fetchNPOsSuccess = false
        state.fetchingNPOs = true
    },
    fetchNPOsError(state) {
        state.fetchingNPO = false
        state.fetchNPOsError = true
    },
    fetchedNPOs(state, npos) {
        state.fetchingNPO = false
        state.fetchNPOsSuccess = true
        state.npos = npos
    },
    //READ NPO
    fetchingOneNPO(state) {
        state.fetchOneNPOError = false
        state.fetchOneNPOSuccess = false
        state.fetchingOneNPO = true
    },
    fetchOneNPOError(state) {
        state.fetchingOneNPO = false
        state.fetchOneNPOError = true
    },
    fetchedOneNPO(state, npo) {
        state.fetchingOneNPO = false
        state.fetchOneNPOSuccess = true
        state.npo = npo
        state.npoEvents = npo.Events
    },
    //CREATE NPO
    addingNPO(state) {
        state.addNPOError = false
        state.addNPOSuccess = false
        state.addingNPO = true
    },
    addNPOError(state) {
        state.addingNPO = false
        state.addNPOError = true
    },
    addedNPO(state) {
        state.addingNPO = false
        state.addNPOSuccess = true
    },
    //UPDATE NPO
    updatingNPO(state) {
        state.updateNPOSuccess = false
        state.updateNPOError = false
        state.updatingNPO = true
    },
    updateNPOError(state) {
        state.updatingNPO = false
        state.updateNPOError = true
    },
    updatedNPO(state, updatedNPO) {
        state.updatingNPO = false
        state.updateNPOSuccess = true
        state.npo = updatedNPO
    },
    //DELETE NPO
    deletingNPO(state) {
        state.deleteNPOError = false
        state.deleteNPOSuccess = false
        state.deletingNPO = true
    },
    deleteNPOError(state) {
        state.deletingNPO = false
        state.deleteNPOError = true
    },
    deletedNPO(state) {
        state.deletingNPO = false
        state.deleteNPOSuccess = true
        state.npo = {}
    },
}