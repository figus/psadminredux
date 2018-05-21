import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as courseActions from './../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.initialCourse),
            errors: {}
        };
    }

    render() {
        return (
            <div>
                <CourseForm
                    allAuthors={[]}
                    course={this.state.course}
                    errors={this.state.errors} />
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    initialCourse: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    let course = {
        id: '',
        watchHref: '',
        title: '',
        authorId: '',
        length: '',
        category: ''
    };

    return {
        initialCourse: course
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