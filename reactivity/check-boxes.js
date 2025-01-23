
bind_checkboxes(result1)
bind_checkboxes(result2)

function bind_checkboxes(cb_group) {

    var cb_list = []
    cb_group.querySelectorAll('input[type=checkbox]').forEach(
        cb => {
            cb_list.push(cb);
            cb.oninput = cb_handler;
        }
    )

    function cb_handler() {
        var ok = cb_list.every(cb => cb.checked)
        cb_group.style.backgroundColor = ok ? 'lightgreen' : ""
    }

    cb_handler()

}
