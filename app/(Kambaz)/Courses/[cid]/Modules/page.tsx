export default function Modules() {
    return (
        <div>
            <button>Collapse All</button>
            <button>View Progress</button>
            <select name="" id="">
                <option value="Publish All">Publish All</option>
            </select>
            <button>+ Module</button>
            {/* Implement Collapse All button, View Progress button, etc. */}
            <ul id="wd-modules">
                {/* Module 1 */}
                <li className="wd-module">
                    <div className="wd-title">Week 1</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the course</li>
                                <li className="wd-content-item">Learn what is Web Development</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                {/* Module 2 */}
                <li className="wd-module">
                    <div className="wd-title">Week 2</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">Lecture 1</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to HTML</li>
                                <li className="wd-content-item">Basic HTML Tags</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                {/* Module 3 */}
                <li className="wd-module">
                    <div className="wd-title">Week 3</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">Lecture 2</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to CSS</li>
                                <li className="wd-content-item">Selectors and Properties</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                {/* Module 4 */}
                <li className="wd-module">
                    <div className="wd-title">Week 4</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">Lecture 3</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to JavaScript</li>
                                <li className="wd-content-item">Variables and Data Types</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                {/* Module 5 */}
                <li className="wd-module">
                    <div className="wd-title">Week 5</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">Lecture 4</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Functions in JavaScript</li>
                                <li className="wd-content-item">DOM Manipulation</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
