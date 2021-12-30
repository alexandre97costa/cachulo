---
id: qS4yXSXVyKGWVCQmaGV2m
title: Input Testing
desc: ''
updated: 1640888244973
created: 1640816633119
---

# Input Testing

To duplicate an item in Cachulo, I needed to create a new item (calling the function `newItem()` ) and passing the current input values as arguments so that the function could feed them and replace the placeholder values. To do this, I needed to test how different kinds of form controls behave to dinamically changing their `value` attribute.

## Input

Normal input elements of `type='text'` and `type='number'` react in the most predictable way of all elements tested. I tried this code:
```html
<label for="input">just a label</label>
<input id="input" type="text"  placeholder="0">
<button id="btn"  type="button">Click</button>
```
With this script for the button
```javascript
document.getElementById('btn').addEventListener('click', (e) => {
    var ti = document.getElementById('input');
    ti.value = 123;
})
```

This resulted in the expected behaviour of the input changing from having no value at all, to having 123 written inside, replacing the lighter-colored placeholder.

## Select
For the select, the html tree has one more layer to accomodate several `option` elements inside `select`:
```html
<select id="input">
    <option value="selected" selected>Selected</option>
    <option value="123">This is the one we want</option>
    <option value="abc">This is not</option>
</select>
```

Using the same script as before, `var ti` is now assigned to the `select` element, and assigning its value to '123' will put the text '_This is the one we want_' inside the element.  
This is because there is an `option` element with the value of '_123_'. When we change the value, its the same as changing the selected option to the one `option` element that has that value in its attributes.

> 💡 **TIP**: Setting the select.value to something other than what is stated in its options will render the select with no text (because there is no option with that value, so no option's text to show either).

## Datalist

`Datalist` elements are similar to `select`, in the way that they also have `option` elements as children. That said, they change in a few aspects:

- They dont appear on the DOM (default styling is `display: none;` )
- They need an accompanying `input` element

```html
<!-- Taken from bootstrap's example cause I'm lazy -->
<label for="exampleDataList" >Datalist example</label>
<input list="datalistOptions" id="exampleDataList" placeholder="Type to search...">
<datalist id="datalistOptions">
    <option value="San Francisco">
    <option value="New York">
    <option value="Seattle">
    <option value="Los Angeles">
    <option value="Chicago">
</datalist>

<button id="def" class="btn btn-danger" type="button">Click</button>
```
With a script for the button
```javascript
document.getElementById('def').addEventListener('click', (e) => {
    var input = document.getElementById('exampleDataList');
    var dl = document.getElementById('datalistOptions');

    input.value = 'New York';
    console.log(input.value);
})
```

By clicking the button, we change the input element's value, and that in itself just updates the text inside it like a normal input would behave. However, if we input a value that is the same as one of the datalist's option values, an item appears for us to select.

Datalists, in my point of view, have one pro and one con compared to `select` elements:
### Pro
- The options get filtered out in real-time while you type;
### Con
- The option you select is not fixed, meaning that you can write whatever you want and is up to the programmer to see if your input is a valid option.

Datalists seem like a suggestion list, because they dont make the user choose from a finite number of options, like select does. Still, because of the filtering alone, I still choose them for _some_ inputs, while others are a better fit for the `select` element.
