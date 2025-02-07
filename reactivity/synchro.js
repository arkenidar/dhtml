var inputs1 = [input1, input2, input3]
var inputs2 = [input4, input5, input6]
sync(inputs1)
sync(inputs2)
function sync(inputs) {
    for (var input of inputs) {
        input.oninput = function () {
            var value = this.value
            for (var input of inputs) {
                input.value = value
            }
        }
    }
}