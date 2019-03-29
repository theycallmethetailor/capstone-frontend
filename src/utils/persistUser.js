export const persistUser = function (user) {
    localStorage.setItem('id', user.ID)
    localStorage.setItem('user_type', user.UserType)
}

export const removePersistedUser = function () {
    const items = ['id', 'user_type']
    items.forEach(item => localStorage.removeItem(item))
}
