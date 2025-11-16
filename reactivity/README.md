# Reactivity Examples - Documentation

This directory contains three examples demonstrating different reactive programming patterns using vanilla JavaScript.

## Overview

These examples teach core reactive programming concepts without framework dependencies, showing the manual patterns that modern frameworks automate.

---

## 1. Check Boxes (`check-boxes.html`, `check-boxes.js`)

### Concept: Derived State / Computed Properties

**Pattern**: UI automatically reacts to state changes - the background color is derived from checkbox states.

### How it works:

```javascript
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
```

### Key Concepts:

1. **Declarative state observation**: Instead of manually updating the background in multiple places, you define one rule: "background is green when all boxes are checked"

2. **Separation of concerns**: 
   - The `cb_handler` function contains the logic (what should happen)
   - The event binding ensures it runs at the right times (when it should happen)

3. **Single source of truth**: The checkbox states are the data, and the background color is derived from that data automatically

4. **Idempotent rendering**: `cb_handler()` can be called repeatedly and always produces the correct result based on current state

### Behavior:

- **result1**: 3 checkboxes (all checked initially) → `lightgreen` background when all checked
- **result2**: 4 checkboxes (all unchecked initially) → `lightgreen` background only when all checked
- As users check/uncheck boxes, the background reactively updates in real-time

### Real-world analogy:
Like a light switch that turns on only when ALL conditions are met.

---

## 2. Multipliers (`multipliers.html`, `multipliers.js`)

### Concept: Shared State with Multiple Dependents

**Pattern**: One value affects multiple outputs - demonstrates one-to-many reactivity and dependency graphs.

### How it works:

```javascript
update_all_multipliers()

function update_all_multipliers() {
    update_specific_multipliers(document.querySelectorAll('.specific_multiplier'))
}

function update_specific_multipliers(specific_multipliers) {
    specific_multipliers.forEach(specific_multiplier => {
        let value1 = parseInt(specific_multiplier.value)
        let common_multiplier = find_input(specific_multiplier, 'common_multiplier')
        let value2 = parseInt(common_multiplier.value)
        specific_multiplier.nextSibling.nextSibling.querySelector('.multiplier_output').textContent = 
            `${value1} * ${value2} => ${value1 * value2}`
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
```

### Key Concepts:

1. **One-to-many reactivity**: One `common_multiplier` affects multiple `specific_multiplier` outputs. When the common value changes, all dependent calculations update.

2. **Dependency graph**: Each output depends on TWO inputs:
   - Its own specific multiplier
   - The shared common multiplier

3. **Cascading updates**: The `increment_multiplier` function shows the pattern:
   - Change data (`input.value++`)
   - Trigger reactive update (`input.oninput()`)
   - Let the system propagate changes

4. **Reusable update logic**: `update_specific_multipliers()` can be called with any subset of multipliers, making it flexible for partial updates or full recalculations.

### Real-world analogy:
Like a spreadsheet - change one cell, and all formulas referencing it recalculate automatically.

---

## 3. Synchro (`synchro.html`, `synchro.js`)

### Concept: Bidirectional Synchronization / Peer-to-Peer Reactivity

**Pattern**: Multiple inputs stay in sync - any one can be the source, all others follow.

### How it works:

```javascript
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
```

### Key Concepts:

1. **Two-way binding within groups**: Any input in a group changes → all others in that group update to match

2. **Multiple synchronized groups**: `inputs1` and `inputs2` are independent - changes in one group don't affect the other

3. **No single source of truth**: Unlike the previous examples where state flowed one direction (checkboxes → background, multipliers → output), here any input can be the source

4. **Symmetrical relationships**: Each input is both a trigger and a target of updates

### Real-world applications:
- **Collaborative editing**: Like Google Docs where multiple cursors see the same content
- **Mirrored state**: Keeping multiple UI representations of the same data in sync
- **Form fields that mirror each other**: e.g., billing = shipping address
- **Multiple views**: list view ↔ grid view ↔ detail view
- **Synchronized controls**: sliders paired with number inputs

---

## Comparison with Modern Frameworks

### What These Examples Show

These examples demonstrate the **manual plumbing** that modern frameworks automate. You explicitly:
- Bind event listeners
- Define when updates should happen
- Call update functions

### Framework Magic (Compiler/Runtime)

Modern frameworks use language or compiler magic to eliminate boilerplate:

#### Svelte (Compile-time reactivity):
```svelte
<script>
  $: allChecked = checkboxes.every(cb => cb.checked)
  $: background = allChecked ? 'lightgreen' : ''
</script>
```
The `$:` tells the compiler "this is reactive, regenerate when dependencies change"

#### Vue 3 (Proxy-based runtime reactivity):
```javascript
const state = reactive({
  checkboxes: [...],
  background: computed(() => 
    state.checkboxes.every(cb => cb.checked) ? 'lightgreen' : ''
  )
})
```

#### What the compiler/runtime generates:
- Automatic dependency tracking: "background depends on allChecked, which depends on checkboxes"
- Auto-generated event listeners
- Efficient change detection (only re-compute what changed)
- Update batching to avoid redundant renders

---

## Summary: Three Patterns of Reactivity

| Example | Pattern | Direction | Use Case |
|---------|---------|-----------|----------|
| **Check Boxes** | Derived state | One direction (data → UI) | Computing values from state |
| **Multipliers** | Computed dependencies | One-to-many | Shared state affecting multiple outputs |
| **Synchro** | Synchronized state | Bidirectional (peer-to-peer) | Keeping multiple inputs in sync |

Together, these examples form a complete introduction to reactive programming fundamentals.

---

## Educational Value

This is a teaching collection showing **reactivity without framework magic** - the core concepts that underpin:
- React's state management
- Vue's reactivity system
- Svelte's compile-time reactivity
- Angular's change detection
- Observable patterns (RxJS)

Understanding these manual patterns makes it easier to understand what frameworks are doing under the hood.
