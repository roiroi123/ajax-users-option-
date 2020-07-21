
async function init () {
    try {
        const selectVal = $("#select").val()
        const response = await getUsers({ url: `https://randomuser.me/api/?results=${selectVal}` })
        const { results } = response
    } catch (err) {
        console.log(err)
        alert(`message: ${err.statusText} , status: ${err.status}`)
    }
}


