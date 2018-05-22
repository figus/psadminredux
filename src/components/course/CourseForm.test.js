import React from 'react'; //React, obviously
import expect from 'expect'; //assertion library
import TestUtils from 'react-addons-test-utils'; //React Test Utils
import CourseForm from './CourseForm'; // lo que se va a probar

//Setup function para regresar el output del rendering del componente a probar
function setup(saving) {
    //Props que usa nuestro componente
    let props = {
        course: {},
        saving: saving,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };

    let renderer = TestUtils.createRenderer();  // crear instancia del renderer
    renderer.render(<CourseForm {...props} />); // ahora a renderear el courseform
    let output = renderer.getRenderOutput();

    //cosas utiles a regresar
    return {
        props,
        output,
        renderer
    };
}

//Describe block, para agrupar y etiquetar las pruebas, para anidar varias pruebas
//En esta prueba se prueba que la estructura del componente sea lo q esperamos
describe('CourseForm via React Test Utils', () => {
    //Assert que un h1 esta dentro de una form
    it('renders form and h1', () => { //Lo q se va a probar
        const {output} = setup();   //corremos setup para obtener el output

        expect(output.type).toBe('form'); //La top-level tag de nuestro componente debe ser "form"

        let [h1] = output.props.children; //Destructuring de los children
        expect(h1.type).toBe('h1'); //esperar que el primer hijo sea h1
    });

    it('Save button is labeled "Save" when not saving', () => {
        const {output} = setup(false);
        const submitButton = output.props.children[5];
        expect(submitButton.props.value).toBe('Save');
    });

    it('Save button is labeled "Saving..." when not saving', () => {
        const {output} = setup(true);
        const submitButton = output.props.children[5];
        expect(submitButton.props.value).toBe('Saving...');
    });
});