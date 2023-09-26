// ==UserScript==
// @name         Mantic Companion Kings of War Army List Filter
// @namespace    http://mayflowercs.com
// @version      1.0
// @description  Filter Army Lists in Mantic Companion Kings of War Army Builder
// @author       You
// @match        https://companion.manticgames.com/kings-of-war-list-builder/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=manticgames.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function filter_list_table(filter)
    {
        const results = {
            hits: 0,
            misses: 0
        }

        document.querySelectorAll('.tool_table tbody tr').forEach(row => {

            // Ignore header rows
            if( undefined === row.dataset.initial) return

            // Check if this row matches the filter
            // Note: Case insensitive matching
            // Note: All rows match an empty filter
            const match = filter==='' || row.innerHTML.toUpperCase().match(filter.toUpperCase())

            // show matches, hide misses
            row.style.display = match ? 'table-row' : 'none'

            // Tally hits and misses
            results.hits += match ? 1 : 0
            results.misses += match ? 0 : 1
        })

        return results
    }

    // Create Filter Form
    const filter_form = document.createElement('div');
    filter_form.style.marginTop = '10px'

    const filter_input = document.createElement('input')
    filter_input.placeholder = 'Filter Lists'
    filter_input.classList.add('width-100')
    filter_input.style.fontSize = '16px'
    filter_input.style.padding = '7.2px'
    filter_input.addEventListener('keyup', event=>{
        const results = filter_list_table(event.target.value)
        // TODO: display results "Displaying Matches/Total Lists" somewhere
        })

    filter_form.append(filter_input)

    // Inject Form into HTML
    document.querySelector('form.kow_create_list_form_quick').insertAdjacentElement('afterend', filter_form )
})();