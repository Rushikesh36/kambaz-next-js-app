"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import * as client from "../Courses/client";
import { RootState } from "../store";
import {
    setEnrollments,
    enrollInCourse,
    unenrollFromCourse,
} from "../Courses/[cid]/Enrollments/reducer";
import {
    findEnrollmentsForUser,
    enrollInCourseApi,
    unenrollFromCourseApi,
} from "../Courses/[cid]/Enrollments/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [showAllCourses, setShowAllCourses] = useState(false);

    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const currentUser = useSelector(
        (state: RootState) => state.accountReducer.currentUser
    ) as any;
    const { enrollments } = useSelector(
        (state: RootState) => state.enrollmentsReducer
    );

    const isFaculty = currentUser?.role === "FACULTY";

    const onDeleteCourse = async (courseId: string) => {
        if (!isFaculty) return;
        await client.deleteCourse(courseId);
        dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
    };

    const onEditCourse = async (course: any) => {
        if (!isFaculty) return;
        const newName = window.prompt("Course name", course.name ?? "");
        if (newName === null) return;
        const newDescription = window.prompt(
            "Course description",
            course.description ?? ""
        );
        if (newDescription === null) return;

        const updated = { ...course, name: newName, description: newDescription };
        await client.updateCourse(updated);
        dispatch(
            setCourses(
                courses.map((c) => (c._id === course._id ? updated : c))
            )
        );
    };

    const fetchCourses = async () => {
        try {
            const data = await client.fetchAllCourses();
            dispatch(setCourses(data));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchEnrollments = async (userId: string) => {
        try {
            const data = await findEnrollmentsForUser(userId);
            dispatch(setEnrollments(data));
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (!currentUser) {
            router.push("Account/Signin");
            return;
        }
        fetchCourses();
        fetchEnrollments(currentUser._id);
    }, [currentUser?._id]);

    if (!currentUser) {
        return null;
    }

    const userEnrollments = enrollments.filter(
        (e: any) => e.user === currentUser._id
    );

    const isEnrolledIn = (courseId: string) =>
        userEnrollments.some((en: any) => en.course === courseId);

    const visibleCourses = showAllCourses
        ? courses
        : courses.filter((course) => isEnrolledIn(course._id));

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />

            <div className="clearfix mb-3">
                <button
                    className="btn btn-primary float-end ms-2"
                    id="wd-toggle-enrollments"
                    onClick={() => setShowAllCourses((v) => !v)}
                >
                    Enrollments
                </button>
            </div>

            <h2 id="wd-dashboard-published">
                {showAllCourses ? "Published Courses" : "Enrolled Courses"} (
                {showAllCourses ? courses.length : visibleCourses.length})
            </h2>
            <hr />

            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {visibleCourses.map((course) => {
                        const enrolled = isEnrolledIn(course._id);

                        return (
                            <Col
                                key={course._id}
                                className="wd-dashboard-course"
                                style={{ width: "300px" }}
                            >
                                <Card>
                                    {enrolled ? (
                                        <Link
                                            href={`/Courses/${course._id}/Home`}
                                            className="wd-dashboard-course-link text-decoration-none text-dark"
                                        >
                                            <Card.Img
                                                src={course.image}
                                                variant="top"
                                                width="100%"
                                                height={160}
                                            />
                                            <CardBody className="card-body">
                                                <CardTitle className="wd-dashboard-course-title fw-bold text-wrap text-primary overflow-hidden">
                                                    {course.name}
                                                </CardTitle>
                                                <CardText
                                                    className="wd-dashboard-course-description overflow-hidden"
                                                    style={{ height: "100px" }}
                                                >
                                                    {course.description}
                                                </CardText>

                                                <div className="mb-2">
                                                    <button
                                                        className="btn btn-danger btn-sm me-2"
                                                        onClick={async (e) => {
                                                            e.preventDefault();
                                                            await unenrollFromCourseApi(
                                                                currentUser._id,
                                                                course._id
                                                            );
                                                            dispatch(
                                                                unenrollFromCourse({
                                                                    user: currentUser._id,
                                                                    course: course._id,
                                                                })
                                                            );
                                                        }}
                                                        id={`wd-unenroll-${course._id}`}
                                                    >
                                                        Unenroll
                                                    </button>
                                                </div>

                                                <Button variant="primary">
                                                    Go
                                                </Button>

                                                {isFaculty && (
                                                    <>
                                                        <button
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                onEditCourse(course);
                                                            }}
                                                            className="btn btn-warning float-end ms-2"
                                                            id="wd-edit-course-click"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                onDeleteCourse(course._id);
                                                            }}
                                                            className="btn btn-danger float-end"
                                                            id="wd-delete-course-click"
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </CardBody>
                                        </Link>
                                    ) : (
                                        <div className="text-muted">
                                            <Card.Img
                                                src={course.image}
                                                variant="top"
                                                width="100%"
                                                height={160}
                                            />
                                            <CardBody className="card-body">
                                                <CardTitle className="wd-dashboard-course-title fw-bold text-wrap text-secondary overflow-hidden">
                                                    {course.name}
                                                </CardTitle>
                                                <CardText
                                                    className="wd-dashboard-course-description overflow-hidden"
                                                    style={{ height: "100px" }}
                                                >
                                                    {course.description}
                                                </CardText>

                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={async (e) => {
                                                        e.preventDefault();
                                                        await enrollInCourseApi(
                                                            currentUser._id,
                                                            course._id
                                                        );
                                                        dispatch(
                                                            enrollInCourse({
                                                                user: currentUser._id,
                                                                course: course._id,
                                                            })
                                                        );
                                                    }}
                                                    id={`wd-enroll-${course._id}`}
                                                >
                                                    Enroll
                                                </button>
                                            </CardBody>
                                        </div>
                                    )}
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
}