//Core
import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';

const props = {
    _createPost:          jest.fn(),
    avatar:               'lisa',
    currentUserFirstName: 'FirstName',
};

const comment = 'Merry christmas!';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');

const textareaPlaceholder = `What's on your mind, ${props.currentUserFirstName}?`;

describe('composer component:', () => {
    test('should have 1 "section" element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 "form" element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 "textarea" element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 "input" element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have 1 "img" element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change properly', () => {
        result.setState({ comment });

        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({ comment: '' });

        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea "change" event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });

        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });

    test('should handle form "submit" event', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('_createPost prop should be invoked once after form submission', () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit class methods should be invoked once after form is submitted ', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test('_submitOnEnter class method should be invoked once after key press', () => {
        result.find('textarea').simulate('keypress');
        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
    });

    test('_submitOnEnter class method should be invoked after keypress "Enter" key', () => {
        result.setState({ comment });

        result.instance()._submitOnEnter({
            key:            'Enter',
            preventDefault: jest.fn(),
        });

        expect(result.state()).toEqual(initialState);
    });

    test('_submitComment should return null for empty comment', () => {
        expect(_submitCommentSpy()).toBeNull();
    });

    test('img should have valid src', () => {
        expect(result.find('img').prop('src')).toBe(props.avatar);
    });

    test('textarea should have valid placeholder', () => {
        expect(result.find('textarea').prop('placeholder')).toBe(textareaPlaceholder);
    });
});
