import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as courseActions from './../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from './../../selectors/selectors';

export class ManageCoursePage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.initialCourse),
            errors: {},
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.initialCourse.id != nextProps.initialCourse.id) {
            this.setState({ course: Object.assign({}, nextProps.initialCourse) });
        }
    }


    updateCourseState(event) {
        const field = event.target.name;
        let course = Object.assign({}, this.state.course);
        course[field] = event.target.value;

        return this.setState({ course: course });
    }

    courseFormValid() {
        let formIsValid = true;
        let error = {};
        
        if (this.state.course.title.length < 5) {
            error.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({errors: error});
        return formIsValid;
    }

    saveCourse(event) {
        event.preventDefault();

        if (!this.courseFormValid()) {
            return;
        }

        this.setState({ saving: true });

        this.props.actions.saveCourse(this.state.course)
            .then(() => {
                this.setState({ saving: false });
                toastr.success('Course saved.');
                this.context.router.push('/courses');
            })
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    render() {
        return (
            <div>
                <CourseForm
                    allAuthors={this.props.authors}
                    course={this.state.course}
                    errors={this.state.errors}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                    saving={this.state.saving} />
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    initialCourse: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id === id);
    if (course.length) {
        return course[0];
    }
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;

    let course = {
        id: '',
        watchHref: '',
        title: '',
        authorId: '',
        length: '',
        category: ''
    };

    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }

    return {
        initialCourse: course,
        authors: authorsFormattedForDropdown(state.authors)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCoursePage);