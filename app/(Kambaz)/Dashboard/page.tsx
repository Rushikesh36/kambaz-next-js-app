import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1234" className="wd-dashboard-course-link">
                        <Image src="/images/course.jpg" width={200} height={150} alt="" />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/5678" className="wd-dashboard-course-link">
                        <Image src="/images/course.jpg" width={200} height={150} alt="" />
                        <div>
                            <h5> CS5678 Python for Data Science </h5>
                            <p className="wd-dashboard-course-title">
                                Introduction to machine learning with Python
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/9012" className="wd-dashboard-course-link">
                        <Image src="/images/course.jpg" width={200} height={150} alt="" />
                        <div>
                            <h5> UI9012 UX/UI Fundamentals </h5>
                            <p className="wd-dashboard-course-title">
                                User experience design and prototyping
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/3456" className="wd-dashboard-course-link">
                        <Image src="/images/course.jpg" width={200} height={150} alt="" />
                        <div>
                            <h5> WEB3456 Modern Web Development </h5>
                            <p className="wd-dashboard-course-title">
                                Advanced JavaScript and framework integration
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/7890" className="wd-dashboard-course-link">
                        <Image src="/images/course.jpg" width={200} height={150} alt="" />
                        <div>
                            <h5> AI7890 Artificial Intelligence Basics </h5>
                            <p className="wd-dashboard-course-title">
                                Foundations of AI and intelligent systems
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1122" className="wd-dashboard-course-link">
                        <Image src="/images/course.jpg" width={200} height={150} alt="" />
                        <div>
                            <h5> SEC1122 Cybersecurity Essentials </h5>
                            <p className="wd-dashboard-course-title">
                                Network security and ethical hacking
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/3344" className="wd-dashboard-course-link">
                        <Image src="/images/course.jpg" width={200} height={150} alt="" />
                        <div>
                            <h5> DB3344 Database Management Systems </h5>
                            <p className="wd-dashboard-course-title">
                                SQL and NoSQL database administration
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/5566" className="wd-dashboard-course-link">
                        <Image src="/images/course.jpg" width={200} height={150} alt="" />
                        <div>
                            <h5> GAM5566 Game Development with Unity </h5>
                            <p className="wd-dashboard-course-title">
                                Introduction to C# and 3D game design
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

