import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { ManageCoursePage } from './ManageCoursePage';

describe('Manage Course Page', () => {
    it('sets error message when trying to save empty title', () => {
        const props = {
            authors: [],
            actions: {
                saveCourse: () => { return Promise.resolve(); }
            },
            initialCourse: {
                id: '',
                watchHref: '',
                title: '1234',
                authorId: '',
                length: '',
                category: ''
            }
        };

        const wrapper = mount(<ManageCoursePage {...props} />);
        const saveButton = wrapper.find('input').last();
        expect(saveButton.props().type).toBe('submit');
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });
});