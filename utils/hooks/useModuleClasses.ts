import { useEffect, useState } from "react";
import { Class, fetchModuleClasses } from "@/utils";

export const useModuleClasses = (selectedModuleId: string | null) => {
  const [selectedModuleClasses, setSelectedModuleClasses] = useState<Class[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      if (selectedModuleId) {
        const fetchedClasses = await fetchModuleClasses(selectedModuleId);
        setSelectedModuleClasses(fetchedClasses);
      }
    };

    fetchClasses();
  }, [selectedModuleId]);

  return {
    selectedModuleClasses,
    setSelectedModuleClasses,
  };
};
