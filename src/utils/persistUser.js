export const persistUser = function (user, local) {
    local.set('id', user.ID)
    local.set('user_type', user.UserType)
}

export const removePersistedUser = function (local) {
    console.log("removePersistedUser functrion called: ", local)
    const items = ['id', 'user_type']
    items.forEach(item => local.remove(item))
}
