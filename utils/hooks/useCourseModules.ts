import { useEffect, useState } from "react";
import { fetchCourseModules } from "@/utils";
import { Module } from "@/components";

export const useCourseModules = (selectedCourseId: string | null) => {
  const [selectedCourseModules, setSelectedCourseModules] = useState<Module[]>([]);

  useEffect(() => {
    const fetchModules = async () => {
      if (selectedCourseId) {
        const fetchedModules = await fetchCourseModules(selectedCourseId);
        setSelectedCourseModules(fetchedModules);
      }
    };

    fetchModules();
  }, [selectedCourseId]);

  return {
    selectedCourseModules,
    setSelectedCourseModules,
  };
};
