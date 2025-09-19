export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />

            <label htmlFor="wd-description">Description</label><br />
            <textarea id="wd-description" defaultValue="The assignment is available online. Submit a link to the landing page of">
                
            </textarea>
            <br />

            <table>
                <tbody>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-points">Points</label>
                        </td>
                        <td>
                            <input id="wd-points" defaultValue={100} />
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-group">Assignment Group</label>
                        </td>
                        <td>
                            <select id="wd-group" defaultValue="ASSIGNMENTS">
                                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                <option value="QUIZZES">QUIZZES</option>
                                <option value="EXAMS">EXAMS</option>
                                <option value="PROJECT">PROJECT</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-display-grade-as">Display Grade as</label>
                        </td>
                        <td>
                            <select id="wd-display-grade-as" defaultValue="Points">
                                <option>Points</option>
                                <option>Percentage</option>
                                <option>Complete/Incomplete</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-submission-type">Submission Type</label>
                        </td>
                        <td>
                            <select id="wd-submission-type" defaultValue="ONLINE">
                                <option value="ONLINE">Online</option>
                                <option value="ON_PAPER">On Paper</option>
                                <option value="NONE">No Submission</option>
                            </select>
                            <div style={{ marginTop: 8 }}>
                                <input type="checkbox" id="wd-text-entry" />
                                <label htmlFor="wd-text-entry"> Text Entry</label><br />
                                <input type="checkbox" id="wd-website-url" />
                                <label htmlFor="wd-website-url"> Website URL</label><br />
                                <input type="checkbox" id="wd-media-recordings" />
                                <label htmlFor="wd-media-recordings"> Media Recordings</label><br />
                                <input type="checkbox" id="wd-student-annotation" />
                                <label htmlFor="wd-student-annotation"> Student Annotation</label><br />
                                <input type="checkbox" id="wd-file-upload" />
                                <label htmlFor="wd-file-upload"> File Uploads</label>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-assign-to">Assign to</label>
                        </td>
                        <td>
                            <input id="wd-assign-to" defaultValue="Everyone" />
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-due-date">Due</label>
                        </td>
                        <td>
                            <input id="wd-due-date" type="date" defaultValue="2025-01-31" />
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-available-from">Available from</label>
                        </td>
                        <td>
                            <input id="wd-available-from" type="date" defaultValue="2025-01-01" />
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-available-until">Until</label>
                        </td>
                        <td>
                            <input id="wd-available-until" type="date" defaultValue="2025-02-28" />
                        </td>
                    </tr>
                </tbody>
            </table>

            <br />
            <button>Cancel</button>
            <button>Save</button>
        </div>
    );
}