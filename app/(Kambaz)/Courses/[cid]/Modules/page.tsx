"use client";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { useState, useEffect } from "react";
import { setModules, editModule, updateModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

export default function Modules() {
  const params = useParams();
  const cidRaw = (params as any).cid as string | string[] | undefined;
  const cid = Array.isArray(cidRaw) ? cidRaw[0] : cidRaw ?? "";

  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as any;
  const isFaculty = currentUser?.role === "FACULTY";

  const dispatch = useDispatch();

  const fetchModules = async () => {
    if (!cid) return;
    try {
      const modulesFromServer = await client.findModulesForCourse(cid);
      console.log("Fetched modules:", modulesFromServer);
      dispatch(setModules(modulesFromServer));
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    }
  };

  const onCreateModuleForCourse = async () => {
    if (!isFaculty) return;
    if (!cid) return;
    if (!moduleName.trim()) {
      alert("Please enter a module name");
      return;
    }

    try {
      const newModule = { name: moduleName, course: cid };
      const module = await client.createModuleForCourse(cid, newModule);
      dispatch(setModules([...modules, module]));
      setModuleName(""); // Clear input after successful creation
    } catch (error) {
      console.error("Failed to create module:", error);
      alert("Failed to create module. Please try again.");
    }
  };

  const onRemoveModule = async (moduleId: string) => {
    if (!isFaculty) return;

    try {
      console.log("Attempting to delete module:", moduleId);
      await client.deleteModule(cid, moduleId);
      // Only update UI if API call succeeds
      dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
    } catch (error: any) {
      console.error("Failed to delete module:", error);

      if (error.response?.status === 404) {
        // Module doesn't exist - remove from UI anyway and refetch to sync
        alert("This module no longer exists in the database. Refreshing...");
        fetchModules(); // Re-sync with server
      } else {
        alert("Failed to delete module. Please try again.");
      }
    }
  };

  const onUpdateModule = async (module: any) => {
    if (!isFaculty) return;

    try {
      console.log("Attempting to update module:", module);
      await client.updateModule(cid, module);
      // Only update UI if API call succeeds
      const newModules = modules.map((m: any) =>
        m._id === module._id ? module : m
      );
      dispatch(setModules(newModules));
    } catch (error: any) {
      console.error("Failed to update module:", error);

      if (error.response?.status === 404) {
        // Module doesn't exist - refetch to sync
        alert("This module no longer exists in the database. Refreshing...");
        fetchModules(); // Re-sync with server
      } else {
        alert("Failed to update module. Please try again.");
      }

      // Revert the editing state on error
      dispatch(editModule(module._id));
    }
  };

  useEffect(() => {
    fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  return (
    <div>
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}

      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />

              {!module.editing && module.name}

              {module.editing && isFaculty && (
                <FormControl
                  className="w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(
                      updateModule({ ...module, name: e.target.value })
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}

              {isFaculty && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(id) => onRemoveModule(id)}
                  editModule={(id) => dispatch(editModule(id))}
                />
              )}
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />

                    {lesson.name}

                    {isFaculty && <LessonControlButtons />}
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}