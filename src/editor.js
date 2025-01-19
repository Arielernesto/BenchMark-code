import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
import { EditorState } from '@codemirror/state';
import {  drawSelection, dropCursor, highlightActiveLine, rectangularSelection, keymap } from "@codemirror/view";
import { defaultKeymap, historyKeymap } from "@codemirror/commands";
import { history } from "@codemirror/commands";
import { autocompletion } from "@codemirror/autocomplete";
import { foldGutter, indentOnInput } from "@codemirror/language";
import { lintKeymap } from "@codemirror/lint";
import { searchKeymap } from "@codemirror/search";
import { oneDark } from "@codemirror/theme-one-dark";

const $testCases = document.querySelectorAll('.test-case')
console.log($testCases)
function editorFromTextArea($textarea){

    const state = EditorState.create({
        doc: $textarea.value,
        extensions: [
            drawSelection(),                 // Dibuja selecciones del usuario
            dropCursor(),                    // Muestra un cursor al arrastrar y soltar texto
            // highlightActiveLine(),           // Resalta la línea activa
            rectangularSelection(),          // Permite selecciones rectangulares
            autocompletion(),                // Proporciona autocompletado
            javascript(),                    // Resaltado de sintaxis para JavaScript
            foldGutter(),                    // Añade soporte para plegado de código
            indentOnInput(),                 // Indenta de acuerdo a la sintaxis
            history(),                       // Añade historial de deshacer/rehacer
            keymap.of([...defaultKeymap, ...historyKeymap, ...lintKeymap, ...searchKeymap]),  // Mapeo de teclas
            oneDark,                         // Tema oscuro opcional
            // otras extensiones que uses...
        ]
      });

      
    let view = new EditorView({ 
        state,
    })
    $textarea.parentNode.insertBefore(view.dom, $textarea)
    $textarea.style.display = "none"

    if ($textarea.form) {
        $textarea.form.addEventListener("submit", () => {
            $textarea.value = view.state.doc.toString()
        })
    }

    return view

}

editorFromTextArea(document.getElementById('global'))

$testCases.forEach($testcase => {
    editorFromTextArea($testcase.querySelector('.code'))
})