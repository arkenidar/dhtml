update_all_multipliers()
function update_all_multipliers() {
    update_specific_multipliers(document.querySelectorAll('.specific_multiplier'))
}
function update_specific_multipliers(specific_multipliers) {
    specific_multipliers.forEach(specific_multiplier => {
        let value1 = parseInt(specific_multiplier.value)
        let common_multiplier = find_input(specific_multiplier, 'common_multiplier')
        let value2 = parseInt(common_multiplier.value)
        specific_multiplier.nextSibling.nextSibling.querySelector('.multiplier_output').textContent = `${value1} * ${value2} => ${value1 * value2}`
    })
}
function find_input(input, className) {
    for (; !input.classList.contains(className); input = input.previousElementSibling);
    return input
}
function increment_multiplier(button, className) {
    let input = find_input(button.parentNode, className)
    input.value++
    input.oninput()
}